package service;

import model.Ticket;
import model.User;
import repository.TicketRepository;
import repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private UserRepository userRepository;

    public Optional<Ticket> createTicket(Long userId, Ticket ticketData) {
        return userRepository.findById(userId).map(user -> {
            ticketData.setUser(user);
            return ticketRepository.save(ticketData);
        });
    }

    public List<Ticket> getTicketsByUser(Long userId) {
        return ticketRepository.findByUserId(userId);
    }

    public Optional<Ticket> updateTicket(Long ticketId, Ticket newTicketData) {
        return ticketRepository.findById(ticketId).map(ticket -> {
            ticket.setTitle(newTicketData.getTitle());
            ticket.setDescription(newTicketData.getDescription());
            ticket.setPriority(newTicketData.getPriority());
            ticket.setStatus(newTicketData.getStatus());
            return ticketRepository.save(ticket);
        });
    }

    public boolean deleteTicket(Long ticketId) {
        if (ticketRepository.existsById(ticketId)) {
            ticketRepository.deleteById(ticketId);
            return true;
        }
        return false;
    }
}
