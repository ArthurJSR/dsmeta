import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import NotificationButton from '../NotificationButton';
import './styles.css';
import axios from "axios";
import { BASE_URL } from "../../utils/request";
import { Sale } from "../../models/sale";

function SalesCard() {
    const max = new Date();
    const min = new Date(new Date().setDate(new Date().getDate() - 365));

    const [mindate, setMinDate] = useState(min);
    const [maxdate, setMaxDate] = useState(max);

    const [sales, setSales] = useState<Sale[]>([]);

    useEffect(() => {
        axios.get(`${BASE_URL}/sales`).then(response => { response.data.content });
    }, [])

    return (
        <div className="dsmeta-card">
            <h2 className="dsmeta-sales-title">Vendas</h2>
            <div>
                <div className="dsmeta-form-control-container">
                    <DatePicker
                        selected={mindate}
                        onChange={(date: Date) => setMinDate(date)}
                        className="dsmeta-form-control"
                        dateFormat="dd/MM/yyyy"
                    />
                </div>
                <div className="dsmeta-form-control-container">
                    <DatePicker
                        selected={maxdate}
                        onChange={(date: Date) => setMaxDate(date)}
                        className="dsmeta-form-control"
                        dateFormat="dd/MM/yyyy"
                    />
                </div>
            </div>

            <div>
                <table className="dsmeta-sales-table">
                    <thead>
                        <tr>
                            <th className="show992">ID</th>
                            <th className="show576">Data</th>
                            <th>Vendedor</th>
                            <th className="show992">Visitas</th>
                            <th className="show992">Vendas</th>
                            <th>Total</th>
                            <th>Notificar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map(Sale => {
                            return (
                                <tr key={Sale.id}>
                                    <td className="show992">{Sale.id}</td>
                                    <td className="show576">{new Date(Sale.date).toLocaleDateString()}</td>
                                    <td>{Sale.sellerName}</td>
                                    <td className="show992">{Sale.visited}</td>
                                    <td className="show992">{Sale.deals}</td>
                                    <td>R$ {Sale.amount.toFixed(2)}</td>
                                    <td>
                                        <div className="dsmeta-red-btn-container">
                                            <NotificationButton />
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>

                </table>
            </div>

        </div>
    )
}

export default SalesCard;