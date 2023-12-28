import { DataSource } from "typeorm"
import "dotenv/config"
import { PaymentView } from "src/modules/payments/entities/payment-view.entity"

const dataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [PaymentView],
})