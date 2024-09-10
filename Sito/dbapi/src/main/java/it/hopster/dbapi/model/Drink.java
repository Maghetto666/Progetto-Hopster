package it.hopster.dbapi.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

@Entity(name = "Drink")
@Table(name = "drinks")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Drink implements Serializable {
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
