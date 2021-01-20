import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from '@material-ui/icons';
import { useState } from 'react';
import Link from 'next/link';
import styles from './CountriesTable.module.css';

const orderBy = (countries, value, direction) => {
    if(direction === 'asc') {
        return [...countries].sort((a, b) => a[value] > b[value] ? 1 : -1);
    }

    if(direction === 'desc') {
        return [...countries].sort((a, b) => a[value] > b[value] ? -1 : 1);
    }

    return countries
}

const SortArrow = ({ direction }) => {
    if(!direction) {
        return <></>;
    }

    if(direction === "desc") {
        return <div className={styles.heading__arrow}>
                        <KeyboardArrowDownRounded color="inherit"/>
                    </div>
    } else {
        return <div className={styles.heading__arrow}>
                        <KeyboardArrowUpRounded color="inherit"/>
                    </div>
    }
}

const CountriesTable = ({ countries }) => {
    const [direction, setDirection] = useState();
    const [value, setValue] = useState();

    const orderedCountries = orderBy(countries, value, direction);
    
    const switchArrow = () => {
        if(!direction) {
            setDirection('desc');
        } else if(direction === 'desc') {
            setDirection('asc');
        } else {
            setDirection(null);

        }
    }

    const setValueAndDirection = value => {
        switchArrow();
        setValue(value);
    }

    return <div>
        <div className={styles.heading}>
            <div className={styles.heading_flag}></div>
            <button>
                <div className={styles.heading__name} onClick={() => setValueAndDirection('name')}>
                    Name
                    {value === 'name' && <SortArrow direction={direction}/>}
                </div>
            </button>
            <button>
                <div className={styles.heading__population} onClick={() => setValueAndDirection('population')}>
                    Population
                    {value === 'population' && <SortArrow direction={direction}/>}
                </div>
            </button>
            <button>
                <div className={styles.heading__area} onClick={() => setValueAndDirection('area')}>
                    Area (km<sup style={{fontSize: '.5rem'}}>2</sup>)
                    {value === 'area' && <SortArrow direction={direction}/>}
                </div>
            </button>
            <button>
                <div className={styles.heading__gini} onClick={() => setValueAndDirection('gini')}>
                    Gini
                    {value === 'gini' && <SortArrow direction={direction}/>}
                </div>
            </button>
        </div>
        {
            orderedCountries.map((country) => 
                <Link key={country.name} href={`/country/${country.alpha3Code}`}>
                    <div  className={styles.row}>
                        <div className={styles.flag}>
                            <img src={country.flag} alt={country.name} />
                        </div>
                        <div className={styles.name}>{country.name}</div>
                        <div className={styles.population}>{country.population}</div>
                        <div className={styles.area}>{country.area || 0}</div>
                        <div className={styles.gini}>{country.gini || 0}%</div>

                    </div>
                </Link>
            )

        }
    </div>
}

export default CountriesTable;