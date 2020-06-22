let self;


/**
 * @Outputs
 * @method Private Outputs Functions
 * @default 1Level Tier Object
 */



let outputs = {
    videogame: (object) => {
        return {
            "_id": object._id,
            "name": object.name
        }
    },
}


class MapperVideogame {

    constructor() {
        self = {
            outputs: outputs
        }

        /**
         * @object KEYS for Output Mapping
         * @key Input of Output Function <-> Output for Extern of the API
         * @value Output of Function in Outputs
         */

        this.KEYS = {
            Videogame: 'videogame'
        }
    }

    output(key, value) {
        try {
            return self.outputs[this.KEYS[key]](value);
        } catch (err) {
            throw err;
        }
    }
}

let MapperVideogameSingleton = new MapperVideogame();

export {
    MapperVideogameSingleton
}