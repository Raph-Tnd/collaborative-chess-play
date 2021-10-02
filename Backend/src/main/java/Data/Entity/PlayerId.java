package main.java.Data.Entity;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class PlayerId implements Serializable {
    @Column(name="name", nullable = false)
    private String name;
    @Column(name="id_game", nullable=false)
    private String id_game;

    public String getName() {
        return name;
    }

    public String getId_game() {
        return id_game;
    }

    public void setId_game(String id_game) {
        this.id_game = id_game;
    }

    public void setName(String name) {
        this.name = name;
    }
}