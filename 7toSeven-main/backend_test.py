import requests
import sys
import json
from datetime import datetime

class StreetWearAPITester:
    def __init__(self, base_url="https://street-minimal-2.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def run_test(self, name, method, endpoint, expected_status, data=None, params=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, params=params, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response keys: {list(response_data.keys()) if isinstance(response_data, dict) else 'Non-dict response'}")
                except:
                    print("   Response: Non-JSON")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"   Error: {error_data}")
                except:
                    print(f"   Error text: {response.text[:200]}")

            self.test_results.append({
                "name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": response.status_code,
                "success": success,
                "response_size": len(response.text) if response.text else 0
            })

            return success, response.json() if success and response.text else {}

        except requests.exceptions.Timeout:
            print(f"❌ Failed - Request timeout")
            self.test_results.append({
                "name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": "TIMEOUT",
                "success": False,
                "error": "Request timeout"
            })
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.test_results.append({
                "name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": "ERROR",
                "success": False,
                "error": str(e)
            })
            return False, {}

    def test_api_root(self):
        """Test API root endpoint"""
        success, response = self.run_test(
            "API Root",
            "GET",
            "",
            200
        )
        return success

    def test_get_products(self):
        """Test get all products"""
        success, response = self.run_test(
            "Get All Products",
            "GET",
            "products",
            200
        )
        if success and 'products' in response:
            print(f"   Found {len(response['products'])} products")
            return len(response['products']) > 0
        return success

    def test_get_products_with_filters(self):
        """Test product filtering"""
        filters = [
            ("category=tees", "Category Filter - Tees"),
            ("category=hoodies", "Category Filter - Hoodies"),
            ("sort=price-low", "Sort - Price Low to High"),
            ("sort=price-high", "Sort - Price High to Low"),
            ("sort=newest", "Sort - Newest"),
            ("featured=true", "Featured Products"),
            ("size=M", "Size Filter - M")
        ]
        
        all_passed = True
        for filter_param, test_name in filters:
            success, response = self.run_test(
                test_name,
                "GET",
                f"products?{filter_param}",
                200
            )
            if not success:
                all_passed = False
            elif 'products' in response:
                print(f"   Filtered results: {len(response['products'])} products")
        
        return all_passed

    def test_get_single_product(self):
        """Test get single product by slug"""
        success, response = self.run_test(
            "Get Single Product",
            "GET",
            "products/shadow-oversized-tee",
            200
        )
        if success and 'product' in response:
            product = response['product']
            required_fields = ['id', 'name', 'slug', 'price', 'category', 'sizes', 'images']
            missing_fields = [field for field in required_fields if field not in product]
            if missing_fields:
                print(f"   ⚠️  Missing fields: {missing_fields}")
                return False
            print(f"   Product: {product['name']} - ₹{product['price']}")
            print(f"   Sizes: {product['sizes']}")
            print(f"   Related products: {len(response.get('related', []))}")
            return True
        return success

    def test_get_nonexistent_product(self):
        """Test 404 for non-existent product"""
        success, response = self.run_test(
            "Get Non-existent Product",
            "GET",
            "products/non-existent-product",
            404
        )
        return success

    def test_get_collections(self):
        """Test get collections"""
        success, response = self.run_test(
            "Get Collections",
            "GET",
            "collections",
            200
        )
        if success and 'collections' in response:
            print(f"   Found {len(response['collections'])} collections")
            return len(response['collections']) > 0
        return success

    def test_get_drop_stories(self):
        """Test get drop stories"""
        success, response = self.run_test(
            "Get Drop Stories",
            "GET",
            "drop-stories",
            200
        )
        if success and 'stories' in response:
            print(f"   Found {len(response['stories'])} stories")
            return len(response['stories']) > 0
        return success

    def test_create_order(self):
        """Test order creation"""
        order_data = {
            "items": [
                {
                    "product_id": "prod_001",
                    "product_name": "SHADOW OVERSIZED TEE",
                    "size": "M",
                    "quantity": 2,
                    "price": 1499,
                    "image": "https://images.unsplash.com/photo-1618123069754-cd64c230a169?w=800&q=80"
                },
                {
                    "product_id": "prod_003",
                    "product_name": "ECLIPSE HOODIE",
                    "size": "L",
                    "quantity": 1,
                    "price": 3499,
                    "image": "https://images.unsplash.com/photo-1499971442178-8c10fdf5f6ac?w=800&q=80"
                }
            ],
            "customer_name": "Test Customer",
            "customer_email": "test@example.com",
            "customer_phone": "9876543210",
            "address": "123 Test Street",
            "city": "Mumbai",
            "state": "Maharashtra",
            "pincode": "400001"
        }
        
        success, response = self.run_test(
            "Create Order",
            "POST",
            "orders",
            200,
            data=order_data
        )
        
        if success and 'order_id' in response:
            print(f"   Order ID: {response['order_id']}")
            print(f"   Total: ₹{response.get('total', 'N/A')}")
            print(f"   Shipping: ₹{response.get('shipping', 'N/A')}")
            return response['order_id']
        return None

    def test_get_order(self, order_id):
        """Test get order by ID"""
        if not order_id:
            print("⚠️  Skipping get order test - no order ID available")
            return False
            
        success, response = self.run_test(
            "Get Order",
            "GET",
            f"orders/{order_id}",
            200
        )
        
        if success:
            print(f"   Order status: {response.get('status', 'N/A')}")
            print(f"   Items count: {len(response.get('items', []))}")
            return True
        return success

    def test_get_nonexistent_order(self):
        """Test 404 for non-existent order"""
        success, response = self.run_test(
            "Get Non-existent Order",
            "GET",
            "orders/INVALID123",
            404
        )
        return success

def main():
    print("🚀 Starting 7toSEVEN E-commerce API Tests")
    print("=" * 50)
    
    tester = StreetWearAPITester()
    
    # Test API availability
    if not tester.test_api_root():
        print("❌ API is not accessible. Stopping tests.")
        return 1

    # Test product endpoints
    print("\n📦 Testing Product Endpoints...")
    tester.test_get_products()
    tester.test_get_products_with_filters()
    tester.test_get_single_product()
    tester.test_get_nonexistent_product()
    
    # Test collections and stories
    print("\n📚 Testing Collections & Stories...")
    tester.test_get_collections()
    tester.test_get_drop_stories()
    
    # Test order endpoints
    print("\n🛒 Testing Order Endpoints...")
    order_id = tester.test_create_order()
    tester.test_get_order(order_id)
    tester.test_get_nonexistent_order()

    # Print final results
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} passed")
    
    # Print failed tests
    failed_tests = [test for test in tester.test_results if not test['success']]
    if failed_tests:
        print("\n❌ Failed Tests:")
        for test in failed_tests:
            error_msg = test.get('error', f'Status {test["actual_status"]}')
            print(f"   - {test['name']}: {error_msg}")
    
    # Save detailed results
    with open('/app/backend_test_results.json', 'w') as f:
        json.dump({
            'summary': {
                'total_tests': tester.tests_run,
                'passed_tests': tester.tests_passed,
                'failed_tests': tester.tests_run - tester.tests_passed,
                'success_rate': round((tester.tests_passed / tester.tests_run) * 100, 2) if tester.tests_run > 0 else 0
            },
            'test_results': tester.test_results,
            'timestamp': datetime.now().isoformat()
        }, f, indent=2)
    
    print(f"\n📄 Detailed results saved to: /app/backend_test_results.json")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())