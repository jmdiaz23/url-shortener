import {DataTypes} from 'sequelize';
import sequelize from '../config/db.js';


const Url = sequelize.define('Url', 
    { 
        url:{
            type: DataTypes.TEXT,
            allowNull: false,
        },
        shortCode:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,  

        },
        accessCount:{
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    },
    {
        timestamps: true,
        createdAt: 'created_at', 
        updatedAt: 'updated_at',   
    }
);
export default Url;
