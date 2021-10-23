package main.java.Data.Entity;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name="PLAYER")
public class PlayerEntity {

    @EmbeddedId
    public PlayerId id;

    @Column(name="team", nullable = false)
    public byte team;

}

