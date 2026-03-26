INSERT INTO roles (name) VALUES
('ADMIN'),
('USER');

INSERT INTO users (username, password, email, phone, address, role_id) VALUES
('admin', '123456', 'admin@gmail.com', '0900000001', 'Ha Noi', 1),
('user1', '123456', 'user1@gmail.com', '0900000002', 'Ha Noi', 2),
('user2', '123456', 'user2@gmail.com', '0900000003', 'Ho Chi Minh', 2);


INSERT INTO products (name, description, price, stock, category_id, image_url) VALUES
('Gengar', 'Deep in the night, your shadow cast by a streetlight may suddenly overtake you. It is actually a GENGAR running past you, pretending to be your shadow.', 19.99, 50, 1, 'https://i.ebayimg.com/images/g/9HkAAOSwkcNnUGS7/s-l1600.webp'),
('Pachirisu', 'Unexpected world champion', 149.50, 25, 1, 'https://cdn.kawaii.limited/products/45/45154/1/xl/japan-pokemon-plush-toy-s-pachirisu-all-star-collection.jpg'),
('Pikachu', 'More popular than Pokémon themselves', 89.99, 15, 1, 'https://i.pinimg.com/736x/b6/ca/fb/b6cafb43f8158103e3e41f52a1b3a6a3.jpg'),
('Vaporeon', 'Greatest Pokémon copypasta of all time.', 12.00, 100, 2, 'https://www.pokemoncenter.com/images/DAMRoot/High/10006/P10328_703E13097_01.jpg'),
('Mimikyu', 'I love Mimikyu. My favourite.', 29.95, 40, 2, 'https://danfigure.vn/wp-content/uploads/2026/01/vn-11134207-820l4-mjc9naxj277l9c-768x768.webp'),
('Grenninja', 'Better than Satoshi''s Gekkouga.', 55.00, 30, 2, 'https://aniworld4u.com/image/cache/data/Re-ment%20Pokemon%20Forest%205%20Autumnn%20leaves%20greninja%201-1000x1000.jpg'),
('Cubone', 'Greatest Pokémon creepypasta of all time.', 22.50, 60, 2, 'https://danfigure.vn/wp-content/uploads/2025/08/Pokemon_Cubone_Home_Collection_05.webp'),
('Charizard', 'As if this is first edition Charizard.', 34.00, 20, 3, 'https://i.ebayimg.com/images/g/49oAAeSwR1NoztjZ/s-l1600.webp'),
('ADP Zacian', 'What a nightmare.', 199.99, 10, 3, 'https://mktg-assets.tcgplayer.com/fit-in/1000x1000/filters:quality(75)/content/pokemon/1_21/14/C-01-15-2021-PKM.jpg'),
('Charmander', 'An angry Charmander behind the window.', 45.00, 35, 3, 'https://i.ebayimg.com/images/g/c7cAAOSwX1dm-tdW/s-l1600.webp'),
('Poliwhirl', 'Cute Poliwhirl walking in the rain.', 75.00, 45, 3, 'https://preview.redd.it/which-illustration-rare-cards-art-goes-the-hardest-v0-9kztlwdcxxed1.jpeg?auto=webp&s=4b26f8e33bea69c358bc367c811b85aa3b760b2b'),
('Rotom', 'Chilling Fan Rotom at where he is.', 15.99, 80, 3, 'https://pkmncards.com/wp-content/uploads/me2-5_en_250_std.png'),
('Lantern', 'Swimming? Maybe.', 65.00, 28, 4, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnNoBW3MDFaEGzDYrxBaPTE62dF4k3SG_otA&s'),
('Cramorant', 'Usually fish instead of Pikachu in his mouth.', 49.99, 18, 4, 'https://mir-s3-cdn-cf.behance.net/projects/404/7bf9e4186713239.Y3JvcCw4NjksNjgwLDEwNSww.jpg'),
('Kyogre', 'What a scary fish ruling the ocean.', 18.50, 55, 4, 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0eb0f155-e353-4cbc-882d-ea2e9025c5b5/ddpquze-b5fde401-6114-4449-a367-2afbe9e44e3d.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiIvZi8wZWIwZjE1NS1lMzUzLTRjYmMtODgyZC1lYTJlOTAyNWM1YjUvZGRwcXV6ZS1iNWZkZTQwMS02MTE0LTQ0NDktYTM2Ny0yYWZiZTllNDRlM2QuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.OnCFb1DgHGPX2FQfHlFOkdNXliKB35K5qnPSIeLK4gA');