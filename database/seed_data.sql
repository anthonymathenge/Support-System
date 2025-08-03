
-- Users
INSERT INTO users (username, email, password, role)
VALUES 
('Alice', 'alice@example.com', '$2a$10$testhashedpass1234567890abcd', 'USER'),
('Bob', 'bob@example.com', '$2a$10$testhashedpass0987654321abcd', 'ADMIN');

-- Tickets
INSERT INTO tickets (title, description, status, priority, user_id)
VALUES 
('Login Issue', 'User unable to login after password reset.', 'OPEN', 'HIGH', 1),
('Page not loading', 'Dashboard page keeps loading indefinitely.', 'IN_PROGRESS', 'MEDIUM', 1),
('Bug in report module', 'Reports do not match filtered data.', 'RESOLVED', 'HIGH', 2);
