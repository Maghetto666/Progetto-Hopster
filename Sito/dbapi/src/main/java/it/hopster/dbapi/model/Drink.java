package it.hopster.dbapi.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "drinks")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Drink {
    @Id
    @Column(name = "drink_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 80)
    private String product;
    @Column(nullable = false, length = 80)
    private String brand;
    private int quantity;
    private Date expirationDate;
}
