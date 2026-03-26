package com.he194009.fizhstore.controller;

import com.he194009.fizhstore.entity.Product;
import com.he194009.fizhstore.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @GetMapping("/top10")
    public List<Product> getTop10() {
        return service.getTop10Products();
    }

    @GetMapping("/{id}")
    public Product getById(@PathVariable Long id) {
        return service.getProductById(id);
    }

    @GetMapping
    public List<Product> getProducts(
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String sort
    ) {
        return service.getProducts(categoryId, keyword, sort);
    }
}