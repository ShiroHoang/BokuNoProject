package com.he194009.fizhstore.repository;

import com.he194009.fizhstore.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Page<Product> findAll(Pageable pageable);

    List<Product> findTop10ByOrderByIdDesc();
}
