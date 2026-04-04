import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const API = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'}/api`;

export function useProducts(params = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Using useMemo to prevent unnecessary re-fetches if simple objects are passed
  const queryStr = useMemo(() => {
    const searchParams = new URLSearchParams();
    if (params.category && params.category !== 'all') {
      searchParams.set('category', params.category);
    }
    if (params.sort) {
      searchParams.set('sort', params.sort);
    }
    if (params.size) {
      searchParams.set('size', params.size);
    }
    return searchParams.toString();
  }, [params.category, params.sort, params.size]);

  useEffect(() => {
    setLoading(true);
    axios.get(`${API}/products?${queryStr}`)
      .then(res => {
        setProducts(res.data.products || []);
        setError(null);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setError(err);
        setProducts([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [queryStr]);

  return { products, loading, error };
}

export function useProduct(slug) {
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    axios.get(`${API}/products/${slug}`)
      .then(res => {
        setProduct(res.data.product);
        setRelated(res.data.related || []);
      })
      .catch(err => {
        console.error("Error fetching product:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);
  
  return { product, related, loading };
}
