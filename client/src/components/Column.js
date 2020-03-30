import React from "react";


const Column = ({ base =12, sm, md, lg, xl, children})  => {
    let columnClassName = `col-${base}`;


    if (sm) {
        columnClassName = columnClassName.concat(` col-sm-${sm}`);
    }
    if (md) {
        columnClassName = columnClassName.concat(` col-sm-${md}`);
    }
    if (lg) {
        columnClassName = columnClassName.concat(` col-sm-${lg}`);
    } 
    if (xl) {
        columnClassName = columnClassName.concat(` col-sm-${xl}`);
    } 


   return <div className={columnClassName}>{children}</div>     


};


export default Column;
