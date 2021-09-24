package main.java.Data.Translator;

import main.java.Data.Entity.PlayerEntity;
import main.java.Data.Model.PlayerModel;

public class PlayerTranslater {
    public static PlayerEntity toEntity(PlayerModel playerModel) {
        PlayerEntity playerEntity = new PlayerEntity();
        playerEntity.name = playerModel.name;
        playerEntity.team = playerModel.team;

        return playerEntity;
    }

    public static PlayerModel toEntity(PlayerEntity playerEntity) {
        PlayerModel playerModel = new PlayerModel();
        playerModel.name = playerEntity.name;
        playerModel.team = playerEntity.team;

        return playerModel;
    }
}
