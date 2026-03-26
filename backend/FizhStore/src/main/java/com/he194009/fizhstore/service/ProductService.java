package com.he194009.fizhstore.service;

import com.he194009.fizhstore.entity.Product;
import com.he194009.fizhstore.repository.ProductRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository repo;

    public ProductService(ProductRepository repo) {
        this.repo = repo;
    }

    public List<Product> getAllProducts() {
        return repo.findAll();
    }

    public List<Product> getTop10Products() {
        return repo.findTop10ByOrderByIdDesc();
    }

    public Product getProductById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public List<Product> getProducts(Long categoryId, String keyword, String sort) {

        List<Product> products = repo.findAll();

        if (categoryId != null) {
            products = products.stream()
                    .filter(p -> p.getCategory().getId().equals(categoryId))
                    .toList();
        }

        if (keyword != null && !keyword.isEmpty()) {
            products = products.stream()
                    .filter(p -> p.getName().toLowerCase().contains(keyword.toLowerCase()))
                    .toList();
        }

        if (sort != null) {
            switch (sort) {
                case "priceAsc":
                    products.sort((a, b) -> Double.compare(a.getPrice(), b.getPrice()));
                    break;
                case "priceDesc":
                    products.sort((a, b) -> Double.compare(b.getPrice(), a.getPrice()));
                    break;
            }
        }
        return products;
    }


}