package controller;

import model.Ticket;
import model.User;
import repository.TicketRepository;
import repository.UserRepository;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/create/{userId}")
        public ResponseEntity<?> createTicket(@PathVariable Long userId, @Valid @RequestBody Ticket ticket) {
            return userRepository.findById(userId)
            .<ResponseEntity<?>>map(user -> {
                ticket.setUser(user);
                Ticket saved = ticketRepository.save(ticket);
                return ResponseEntity.ok(saved); //returns ResponseEntity
        })
        .orElse(ResponseEntity.badRequest().body("User not found")); //ResponseEntity
}


    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Ticket>> getUserTickets(@PathVariable Long userId) {
        return ResponseEntity.ok(ticketRepository.findByUserId(userId));
    }

    @PutMapping("/update/{ticketId}")
    public ResponseEntity<?> updateTicket(@PathVariable Long ticketId, @RequestBody Ticket updatedTicket) {
        return ticketRepository.findById(ticketId)
            .<ResponseEntity<?>>map(ticket -> {
                ticket.setTitle(updatedTicket.getTitle());
                ticket.setDescription(updatedTicket.getDescription());
                ticket.setPriority(updatedTicket.getPriority());
                ticket.setStatus(updatedTicket.getStatus());
                ticketRepository.save(ticket);
                return ResponseEntity.ok(ticket);
            })
        .orElse(ResponseEntity.badRequest().body("Ticket not found"));
}


    @DeleteMapping("/delete/{ticketId}")
    public ResponseEntity<?> deleteTicket(@PathVariable Long ticketId) {
        if (!ticketRepository.existsById(ticketId)) {
            return ResponseEntity.badRequest().body("Ticket not found");
        }
        ticketRepository.deleteById(ticketId);
        return ResponseEntity.ok("Ticket deleted");
    }
}
