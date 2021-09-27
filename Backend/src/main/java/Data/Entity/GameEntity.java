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

    //white = team 0
    @Column(name="w_players", nullable = false)
    public int w_players;

    //black = team 1
    @Column(name="b_players", nullable = false)
    public int b_players;
}
