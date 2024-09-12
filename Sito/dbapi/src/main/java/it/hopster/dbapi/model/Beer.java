package it.hopster.dbapi.model;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;

@Entity(name = "Beer")
@Table(name = "beers")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Beer implements Serializable {
    @Id
    @Column(name = "beer_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 80)
    private String brewery;
    @Column(nullable = false, length = 80)
    private String beerName;
    private int quantity;
    @Column(nullable = false, length = 80)
    private String beerStyle;
    @Column(nullable = false, length = 80)
    private String barrelTypeAndTap;
    private LocalDate deliveryDate;
    @Nullable
    private LocalDate fullBarrelDate;
    @Nullable
    private LocalDate emptyBarrelDate;
}