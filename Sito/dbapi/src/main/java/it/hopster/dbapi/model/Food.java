package it.hopster.dbapi.model;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;

@Entity(name = "Food")
@Table(name = "foods")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Food implements Serializable {
    @Id
    @Column(name = "food_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 80)
    private String product;
    private int quantity;
    private LocalDate deliveryDate;
    private LocalDate expirationDate;
    @Nullable
    private Boolean isFrozen;
    @Nullable
    private LocalDate freezingDate;
}
