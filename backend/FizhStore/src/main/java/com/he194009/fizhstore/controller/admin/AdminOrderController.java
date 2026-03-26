package com.he194009.fizhstore.controller.admin;

import com.he194009.fizhstore.entity.Order;
import com.he194009.fizhstore.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/orders")
@CrossOrigin
public class AdminOrderController {

    @Autowired
    private OrderRepository orderRepo;

    // GET ALL (có pagination)
    @GetMapping
    public Page<Order> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "9") int size
    ) {
        return orderRepo.findAll(PageRequest.of(page, size, Sort.by("id").descending()));
    }

    // UPDATE STATUS
    @PutMapping("/{id}/status")
    public Order updateStatus(@PathVariable Long id,
                              @RequestParam String status) {

        Order order = orderRepo.findById(id).orElseThrow();

        order.setStatus(status);

        return orderRepo.save(order);
    }
}