import Heading from "../Heading";
import { useEffect, useState } from "react";
import { Location } from "../../interfaces/Location.tsx";
import LinkButton from "../LinkButton";
/*import {fixData} from "../../helpers/fixDate.tsx";*/
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';


export default function ReportView() {
    const [order, setOrder] = useState("createdAt_desc");
    const [quantity/*, setQuantity*/] = useState(25);
    const [lastHrs, setLastHrs] = useState(24);
    const [onlyActual, setActuality] = useState(true);
    const [locations, setLocations] = useState<Location[] | null>(null);
    const [showFilters, setShowFilters] = useState(false); // New state for showing/hiding filters

    const refresh = () => {
        const requestOptions = {
            method: 'GET'
        };
        const searchParams = new URLSearchParams({
            'orderBy': order,
            'lastHrs': lastHrs.toString(),
            'actual': String(onlyActual),
            'maxRows': quantity.toString()
        });

        console.log('http://localhost:3000/api/location/get?' + searchParams, requestOptions)

        fetch('http://localhost:3000/api/location/get?' + searchParams, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data.record)
                setLocations(data.record);
            })
            .catch(error => {
                console.error('Error fetching locations:', error);
            });
    };
    const checkHandler = () => {
        setActuality(!onlyActual)
    }

    useEffect(() => {
        refresh();
    }, []);

    return (
        <div className="ReportView">
            <button id={"filters"} className={'btn btn-secondary'} onClick={() => setShowFilters(!showFilters)}>
                {showFilters ? "Ukryj filtry" : "Pokaż filtry"}
            </button>

            {showFilters && (
                <form method="post" className="filterOptions">
                    {/*<div className="form-group">
                    <label>Liczba zgłoszeń</label>
                    <select name="quantity" value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value))} className="form-control">
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>*/}
                    <div className="form-group">
                        <label htmlFor={'quantity'}>Czas od zgłoszenia:</label>
                        <select name="quantity" id={'quantity'} value={lastHrs} onChange={(e) => setLastHrs(parseInt(e.target.value))}
                                className="form-control">
                            <option value="1">1 godzina</option>
                            <option value="2">2 godziny</option>
                            <option value="4">4 godziny</option>
                            <option value="6">6 godzin</option>
                            <option value="12">12 godzin</option>
                            <option value="24">1 dzień</option>
                            <option value="168">7 dni</option>

                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor={'order'}>Sortuj po:</label>
                        <select name="order" value={order} onChange={(e) => setOrder(e.target.value)}
                                className="form-control">
                            <option value="createdAt_desc">Najnowsze</option>
                            <option value="rating_desc">Oceny</option>
                        </select>
                    </div>
                    <div className="form-group form-check">
                        <input checked={onlyActual} onChange={checkHandler} type="checkbox" name="actual"
                               className="form-check-input" id="actualCheck"/>
                        <label className="form-check-label" htmlFor="actualCheck">Tylko aktualne</label>
                    </div>

                    <div className={"d-flex gap-2"}>
                        <input type="reset" value="Wyczyść filtry"
                               className="btn btn-secondary"/>
                        <button type="button" id={'applyFilters'} className="btn btn-primary"
                                onClick={refresh}>Filtruj
                        </button>
                    </div>
                </form>
            )}


            <div className="reportList mt-5 d-flex gap-3 flex-wrap">
                {locations?.map(location  => (

                    <div key={location.id} className="location card mb-3">
                        <div className={location.actual ? "background-green-light actuality sec-font" : "background-blue-light actuality sec-font"}>{location.actual ? "Aktualne" : "Nieaktualne"}</div>

                        <div className="card-body">
                            <Heading level={3} content={location.target.name} className="name-location"/>
                            <p className={'card-text'}>{location.details}</p>
                            <LinkButton content={'Szczegóły'} href={`/reports/${location.id}`}
                                        icon={<FontAwesomeIcon icon={faArrowRight}/>} className="hover-link"/>
                        </div>

                        <div className={'bottom-data'}>
                            <div className="card-text btm d-flex">
                                <span className={'icon w-100 d-space'}><a className={'font-weight-bold'}>Ocena</a> <div
                                    className={''}><FontAwesomeIcon icon={faStar}/> {(location.rating).toFixed(2)}</div></span>
                            </div>

                            <div className="card-text btm d-flex">
                                <span className={'icon w-100 d-space'}>
                                    <div>
                                        <FontAwesomeIcon icon={faLocationDot}/> <a className={'font-weight-bold'}>Adres</a>

                                    </div>

                                    {location.address}
                                </span>
                            </div>

                            {/*<p className="card-text btm">Zaktualizowano: {fixData(location.createdAt)}</p>*/}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
