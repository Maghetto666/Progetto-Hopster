package it.hopster.dbapi.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "supplies")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Supply {
    @Id
    @Column(name = "supply_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 80)
    private String product;
    @Column(nullable = false, length = 80)
    private int quantity;
    private Date deliveryDate;
    private Date expirationDate;
}