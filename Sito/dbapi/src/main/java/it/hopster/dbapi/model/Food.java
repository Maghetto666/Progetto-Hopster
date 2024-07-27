package it.hopster.dbapi.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "foods")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Food {
    @Id
    @Column(name = "food_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 80)
    private String product;
    private int quantity;
    private Date deliveryDate;
    private Date expirationDate;
    private boolean isFrozen;
    private Date freezingDate;
}
