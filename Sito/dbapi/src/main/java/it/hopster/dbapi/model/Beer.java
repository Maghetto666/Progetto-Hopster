package it.hopster.dbapi.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "beers")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Beer {
    @Id
    @Column(name = "beer_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 80)
    private String brewery;
    @Column(nullable = false, length = 80)
    private String beerName;
    @Column(nullable = false, length = 80)
    private String beerStyle;
    @Column(nullable = false, length = 80)
    private String barrelTypeAndTap;
    private Date fullBarrelDate;
    private Date emptyBarrelDate;
}