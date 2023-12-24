import React, { useEffect, useState } from "react";
import '../styles/explore-business.css';
import MapBox from "../components/MapBox";
import { Link } from "react-router-dom";
import DisplayBusiness from "../components/DisplayBusinesses.tsx";

export interface businessProp{
    name: string, 
    url: string, 
    phone: string, 
    location: {}, 
    business: string,
}

export default function explore_businesses(){
    const allBusinesses: businessProp[] = [];
    const restaurants: businessProp[] = [];
    const groceries: businessProp[] = [];
    const services: businessProp[] = []; 


    useEffect(() => {
        load_info()
    }, []);

    function load_info(){
        load_restaurants(); 
        load_groceries();
        load_services();
        load_all(); 
        console.log(allBusinesses)
    }

    function load_restaurants(){
        let restaurantURL = "http://localhost:323/business?searchTerm=restaurants"

        new Promise((resolve, reject) => {
            fetch(restaurantURL)
            .then((response: Response) => response.json())
            .then(json => {

            if(json == undefined){
                reject(json)
            }
            else{
                Object.keys(json).forEach((key) => {
                let businessName = json[key]["businesses"][0]['name']
                let businessURL = json[key]["businesses"][0]['url']
                let businessLocation = json[key]["businesses"][0]["location"]
                let businessPhone = json[key]["businesses"][0]['phone']

                const data: businessProp = {
                    name: businessName,
                    url: businessURL,
                    phone: businessPhone,
                    location: businessLocation,
                    business:'restaurants',
                }
                restaurants.push(data)
                })
            }
            console.log('restaurants completed')
            })
            .then(result => resolve(result))
        })
    }

    function load_groceries(){
        let groceryURL = "http://localhost:323/business?searchTerm=groceries"
        
        new Promise((resolve, reject) => {
            fetch(groceryURL)
            .then((response: Response) => response.json())
            .then(json => {
            if(json == undefined){
                reject(json)
            }
            else{
                Object.keys(json).forEach((key) => {
                let businessName = json[key]["businesses"][0]['name']
                let businessURL = json[key]["businesses"][0]['url']
                let businessLocation = json[key]["businesses"][0]["location"]
                let businessPhone = json[key]["businesses"][0]['phone']

                const data: businessProp = {
                    name: businessName,
                    url: businessURL,
                    phone: businessPhone,
                    location: businessLocation,
                    business:'groceries',

                }
                groceries.push(data)
                })
            }
            console.log('groceries completed')
            })
            .then(result => resolve(result))
        })
    }

    function load_services(){
        let serviceURL = "http://localhost:323/business?searchTerm=services"

        new Promise((resolve, reject) => {
            fetch(serviceURL)
            .then((response: Response) => response.json())
            .then(json => {
            if(json == undefined){
                reject(json)
            }
            else{
                Object.keys(json).forEach((key) => {
                let businessName = json[key]["businesses"][0]['name']
                let businessURL = json[key]["businesses"][0]['url']
                let businessLocation = json[key]["businesses"][0]["location"]
                let businessPhone = json[key]["businesses"][0]['phone']

                const data: businessProp = {
                    name: businessName,
                    url: businessURL,
                    phone: businessPhone,
                    location: businessLocation,
                    business:'services',
                }
                services.push(data)
                })
            }
            console.log('services completed')

            })
            .then(result => resolve(result))
        })
    }

    function load_all(){
        restaurants.forEach((item) => {
            allBusinesses.push(item)
        })
        groceries.forEach((item) => {
            allBusinesses.push(item)
        })
        services.forEach((item) => {
            allBusinesses.push(item)
        })
    }

    return(
        <div className="business-container">
            <div>
                <DisplayBusiness all={allBusinesses} restaurant={restaurants} grocery={groceries} service={services}></DisplayBusiness>
            </div>            
        </div>
    );
}