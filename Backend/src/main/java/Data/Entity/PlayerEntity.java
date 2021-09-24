package main.java.Data.Entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="PLAYER")
public class PlayerEntity {

    @Id
    @Column(name="name", nullable = false)
    public String name;

    @Column(name="team", nullable = false)
    public byte team;
}
