\c popdbfirstphase

-- Table definitions
CREATE TABLE Locations (
    id VARCHAR PRIMARY KEY,
    address VARCHAR NOT NULL,
    zip_code INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Roles (
    id VARCHAR PRIMARY KEY,
    name VARCHAR NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Employees (
    id VARCHAR PRIMARY KEY,
    location_id VARCHAR NOT NULL,
    role_id VARCHAR NOT NULL,
    code NUMERIC UNIQUE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (location_id) REFERENCES Locations(id),
    FOREIGN KEY (role_id) REFERENCES Roles(id)
);

CREATE TABLE Users (
    id VARCHAR PRIMARY KEY,
    stripe_id VARCHAR NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Accounts (
    id VARCHAR PRIMARY KEY,
    user_id VARCHAR NOT NULL,
    identifier VARCHAR NOT NULL,
    token VARCHAR NOT NULL,
    provider VARCHAR NOT NULL,
    expires TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE Sessions (
    id VARCHAR PRIMARY KEY,
    session_token VARCHAR NOT NULL,
    user_id VARCHAR NOT NULL,
    expires TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE VerificationTokens (
    id VARCHAR PRIMARY KEY,
    user_id VARCHAR NOT NULL,
    token VARCHAR UNIQUE NOT NULL,
    expires TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE Products (
    id VARCHAR PRIMARY KEY,
    location_id VARCHAR NOT NULL,
    name VARCHAR NOT NULL,
    description TEXT,
    price DECIMAL NOT NULL,
    stripe_id VARCHAR NOT NULL,
    deleted_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (location_id) REFERENCES Locations(id)
);

CREATE TABLE IngredientCategories (
    id VARCHAR PRIMARY KEY,
    name VARCHAR NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Ingredients (
    id VARCHAR PRIMARY KEY,
    name VARCHAR NOT NULL,
    unit VARCHAR NOT NULL,
    category_id VARCHAR NOT NULL,
    qty_in_stock INTEGER NOT NULL,
    price DECIMAL NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES IngredientCategories(id)
);

CREATE TABLE ProductIngredients (
    id VARCHAR PRIMARY KEY,
    product_id VARCHAR NOT NULL,
    ingredient_id VARCHAR NOT NULL,
    qty_needed INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES Products(id),
    FOREIGN KEY (ingredient_id) REFERENCES Ingredients(id)
);

CREATE TABLE OrderStatuses (
    id VARCHAR PRIMARY KEY,
    name VARCHAR NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Orders (
    id VARCHAR PRIMARY KEY,
    user_id VARCHAR NOT NULL,
    total_price DECIMAL NOT NULL,
    status_id VARCHAR NOT NULL,
    location_id VARCHAR NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (location_id) REFERENCES Locations(id),
	FOREIGN KEY (status_id) REFERENCES OrderStatuses(id)
);

CREATE TABLE OrderProducts (
    id VARCHAR PRIMARY KEY,
    order_id VARCHAR NOT NULL,
    product_id VARCHAR NOT NULL,
    quantity INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES Orders(id),
    FOREIGN KEY (product_id) REFERENCES Products(id)
);
