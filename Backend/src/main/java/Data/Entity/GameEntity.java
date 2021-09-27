package main.java.Data.Entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="GAME")
public class GameEntity {

    @Id
    @Column(name="id", nullable = false)
    public String id;

    @Column(name="nb_players", nullable = false)
    public int nb_players;
}
