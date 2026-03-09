INSERT INTO roles (name) VALUES
('ADMIN'),
('USER');

INSERT INTO roles (name) VALUES
('ADMIN'),
('USER');

INSERT INTO users (username, password, email, phone, address, role_id) VALUES
('admin', '123456', 'admin@gmail.com', '0900000001', 'Ha Noi', 1),
('user1', '123456', 'user1@gmail.com', '0900000002', 'Ha Noi', 2),
('user2', '123456', 'user2@gmail.com', '0900000003', 'Ho Chi Minh', 2);