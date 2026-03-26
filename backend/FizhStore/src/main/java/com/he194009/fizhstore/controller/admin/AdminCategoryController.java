package com.he194009.fizhstore.controller.admin;

import com.he194009.fizhstore.entity.Category;
import com.he194009.fizhstore.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/categories")
@CrossOrigin
public class AdminCategoryController {

    @Autowired
    private CategoryRepository repo;

    @PostMapping
    public Category create(@RequestBody Category c) {
        return repo.save(c);
    }

    @PutMapping("/{id}")
    public Category update(@PathVariable Long id, @RequestBody Category c) {
        Category old = repo.findById(id).orElseThrow();
        old.setName(c.getName());
        old.setDescription(c.getDescription()); 

        return repo.save(old);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}