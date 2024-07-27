package it.hopster.dbapi.service;

import it.hopster.dbapi.model.Drink;
import it.hopster.dbapi.repository.DrinkRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class DrinkService {

    @Autowired
    private DrinkRepository drinkRepository;

    public List<Drink> getAllDrinks() {
        return drinkRepository.findAll();
    }

    public Drink getDrinkById(Long id) {
        return drinkRepository.findById(id).orElse(null);
    }

    public Drink createDrink(String product, String brand, int quantity, Date expirationDate) {
        Drink newDrink = new Drink(null, product, brand, quantity, expirationDate);
        return drinkRepository.save(newDrink);
    }

    public Drink updateDrink(String product, String brand, int quantity, Date expirationDate) {
        Drink drink = new Drink(null, product, brand, quantity, expirationDate);
        return drinkRepository.save(drink);
    }

    public boolean deleteDrink(Long id) {
        Drink drink = drinkRepository.findById(id).orElse(null);
        if (drink != null) {
            drinkRepository.deleteById(id);
            return true;
        }
        return false;
    }
}