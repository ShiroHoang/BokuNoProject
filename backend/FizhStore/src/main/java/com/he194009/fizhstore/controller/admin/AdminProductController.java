package com.he194009.fizhstore.controller.admin;

import com.he194009.fizhstore.entity.Category;
import com.he194009.fizhstore.entity.Product;
import com.he194009.fizhstore.repository.CategoryRepository;
import com.he194009.fizhstore.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/products")
@CrossOrigin
public class AdminProductController {

    @Autowired
    private ProductRepository productRepo;

    @Autowired
    private CategoryRepository categoryRepo;

    @PostMapping
    public Product create(@RequestBody Product product) {

        Long categoryId = product.getCategory().getId();
        Category category = categoryRepo.findById(categoryId)
                .orElseThrow();

        product.setCategory(category);

        return productRepo.save(product);
    }

    @PutMapping("/{id}")
    public Product update(@PathVariable Long id, @RequestBody Product updated) {
        Product p = productRepo.findById(id).orElseThrow();

        p.setName(updated.getName());
        p.setPrice(updated.getPrice());
        p.setImageUrl(updated.getImageUrl());
        p.setDescription(updated.getDescription());
        p.setStock(updated.getStock());

        Long categoryId = updated.getCategory().getId();
        Category category = categoryRepo.findById(categoryId).orElseThrow();
        p.setCategory(category);

        return productRepo.save(p);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        productRepo.deleteById(id);
    }
}