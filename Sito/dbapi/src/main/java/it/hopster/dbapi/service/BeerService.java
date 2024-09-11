package it.hopster.dbapi.service;

import it.hopster.dbapi.exception.FoodNotFoundException;
import it.hopster.dbapi.model.Beer;

import it.hopster.dbapi.model.Drink;
import it.hopster.dbapi.repository.BeerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class BeerService {

    @Autowired
    private BeerRepository beerRepository;

    public List<Beer> getAllBeers(String orderBy, String orderByDesc) {
        if (orderBy == null && orderByDesc == null) {
            return beerRepository.findAll();
        }
        if (orderBy != null && !orderBy.isEmpty()) {
            return orderBy(orderBy);
        }
        if (orderByDesc != null && !orderByDesc.isEmpty())
            return orderByDesc(orderByDesc);

        return beerRepository.findAll();
    }

    private List<Beer> orderBy(String orderBy) {
        if (orderBy.equals("brewery")) {
            return beerRepository.findByOrderByBrewery();
        }
        if (orderBy.equals("beerName")) {
            return beerRepository.findByOrderByBeerName();
        }
        if (orderBy.equals("quantity")) {
            return beerRepository.findByOrderByQuantity();
        }
        if (orderBy.equals("beerStyle")) {
            return beerRepository.findByOrderByBeerStyle();
        }
        if (orderBy.equals("barrelTypeAndTap")) {
            return beerRepository.findByOrderByBarrelTypeAndTap();
        }
        if (orderBy.equals("deliveryDate")) {
            return beerRepository.findByOrderByDeliveryDate();
        }
        if (orderBy.equals("fullBarrelDate")) {
            return beerRepository.findByOrderByFullBarrelDate();
        }
        if (orderBy.equals("emptyBarrelDate")) {
            return beerRepository.findByOrderByEmptyBarrelDate();
        }
        return beerRepository.findAll();
    }

    private List<Beer> orderByDesc(String orderBy) {
        if (orderBy.equals("brewery")) {
            return beerRepository.findByOrderByBreweryDesc();
        }
        if (orderBy.equals("beerName")) {
            return beerRepository.findByOrderByBeerNameDesc();
        }
        if (orderBy.equals("quantity")) {
            return beerRepository.findByOrderByQuantityDesc();
        }
        if (orderBy.equals("beerStyle")) {
            return beerRepository.findByOrderByBeerStyleDesc();
        }
        if (orderBy.equals("barrelTypeAndTap")) {
            return beerRepository.findByOrderByBarrelTypeAndTapDesc();
        }
        if (orderBy.equals("deliveryDate")) {
            return beerRepository.findByOrderByDeliveryDateDesc();
        }
        if (orderBy.equals("fullBarrelDate")) {
            return beerRepository.findByOrderByFullBarrelDateDesc();
        }
        if (orderBy.equals("emptyBarrelDate")) {
            return beerRepository.findByOrderByEmptyBarrelDateDesc();
        }
        return beerRepository.findAll();
    }

    public Beer getBeerById(Long id) {
        return beerRepository.findById(id).orElse(null);
    }

    public Beer createBeer(Beer newBeer) {
        return beerRepository.save(newBeer);
    }

    public Beer updateBeer(Long id, Beer updatedBeer) {
        Beer beer = beerRepository.findById(id).orElseThrow(() -> new FoodNotFoundException("Birra non trovata"));
        if (!beer.getId().equals(updatedBeer.getId())) {
            throw new FoodNotFoundException("ID birre discordanti");
        }
        return beerRepository.save(updatedBeer);
    }

    public boolean deleteBeer(Long id) {
        Beer beer = beerRepository.findById(id).orElse(null);
        if (beer != null) {
            beerRepository.deleteById(id);
            return true;
        }
        return false;
    }
}