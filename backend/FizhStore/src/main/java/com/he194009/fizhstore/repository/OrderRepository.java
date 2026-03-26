package com.he194009.fizhstore.repository;

import com.he194009.fizhstore.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
