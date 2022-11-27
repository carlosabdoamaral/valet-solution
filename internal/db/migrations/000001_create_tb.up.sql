CREATE TABLE parking_lot_tb(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR NOT NULL,
    address VARCHAR NOT NULL,         -- zip code
    max_capacity INT,                 -- 100 cars
    interval INT NOT NULL,            -- 20 min, 60 min, ...
    price_per_interval FLOAT NOT NULL -- USD 2 * interval
);

CREATE TABLE discount_tier_tb(
    id SERIAL PRIMARY KEY NOT NULL,
    id_parking_lot INT REFERENCES parking_lot_tb(id) NOT NULL,
    title VARCHAR NOT NULL,
    discount_value INT NOT NULL
);

CREATE TABLE car_tb(
    id SERIAL PRIMARY KEY NOT NULL,
    id_parking_lot INT REFERENCES parking_lot_tb(id) NOT NULL,
    id_discount_tier INT REFERENCES discount_tier_tb(id) NOT NULL,
    license_plate VARCHAR NOT NULL,
    did_paid bool DEFAULT false,
    entrance_at timestamp NOT NULL DEFAULT now(),
    exit_at timestamp
);