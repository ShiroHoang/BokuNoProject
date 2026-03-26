package com.he194009.fizhstore.service;

import com.he194009.fizhstore.dto.CartItemDTO;
import com.he194009.fizhstore.entity.Order;
import com.he194009.fizhstore.entity.OrderItem;
import com.he194009.fizhstore.entity.Product;
import com.he194009.fizhstore.entity.User;
import com.he194009.fizhstore.repository.OrderRepository;
import com.he194009.fizhstore.repository.ProductRepository;
import com.he194009.fizhstore.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepo;
    private final ProductRepository productRepo;
    private final UserRepository userRepo;

    public OrderService(OrderRepository orderRepo, ProductRepository productRepo, UserRepository userRepo) {
        this.orderRepo = orderRepo;
        this.productRepo = productRepo;
        this.userRepo = userRepo;
    }

    @Transactional
    public Order createOrder(Long userId, List<CartItemDTO> cart) {

        if (cart == null || cart.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        Order order = new Order();
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("PENDING"); // default status

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        order.setUser(user);

        List<OrderItem> items = new ArrayList<>();
        double total = 0;

        for (CartItemDTO c : cart) {

            if (c.getQuantity() <= 0) {
                throw new RuntimeException("Invalid quantity");
            }

            Product product = productRepo.findById(c.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            OrderItem item = new OrderItem();
            item.setProduct(product);
            item.setQuantity(c.getQuantity());
            item.setPrice(product.getPrice());
            item.setOrder(order);

            total += product.getPrice() * c.getQuantity();
            items.add(item);
        }

        order.setItems(items);
        order.setTotalPrice(total);

        return orderRepo.save(order);
    }

    public List<Order> getOrdersByUser(Long userId) {
        return orderRepo.findByUserIdOrderByOrderDateDesc(userId);
    }
}