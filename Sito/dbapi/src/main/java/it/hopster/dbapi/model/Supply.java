package it.hopster.dbapi.model;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;

@Entity(name = "Supply")
@Table(name = "supplies")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Supply implements Serializable {
    @Id
    @Column(name = "supply_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 80)
    private String product;
    @Column(nullable = false, length = 80)
    private int quantity;
    private LocalDate deliveryDate;
    @Nullable
    private LocalDate exhaustionDate;
    @Nullable
    private LocalDate duration;
}