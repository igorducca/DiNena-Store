import React, { Component, useState } from 'react';
import { Helmet } from 'react-helmet';
import ReactDOM from "react-dom";
import { Link, useLocation, BrowserRouter as Router } from "react-router-dom";
import Axios from 'axios';

import "./styles/dark-global.css"
import "./styles/estoque.css"

import $ from 'jquery'

export default function Estoque() {
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery()

    $( document ).ready(function() {
        if(query.get("produto")) {
            let selectedProduct = query.get("produto")

            Axios.get(`http://localhost:3192/produto?product=${selectedProduct}`)
            .then(resp => {
                if(resp.data[0]) {
                    console.log(resp)

                    document.getElementById('productName').innerText = `Produto selecionado: ${resp.data[0].nome}`
                    document.getElementById('descriptionText').innerText = `"${resp.data[0].descricao}"`
                    document.getElementById('imgSource').src = `${resp.data[0].url}`
                    document.getElementById('imgUrlClick').href = `${resp.data[0].url}`

                    if(resp.data[0].quantidade) {
                        document.getElementById('estoqueStatusYes').hidden = false;
                    }
                    else {
                        document.getElementById('estoqueStatusNo').hidden = false;
                    }

                    document.getElementById('estoqueQuantidade').innerText = `Quantidade em estoque: ${resp.data[0].quantidade}`
                    document.getElementById('preco').innerText = `Preço: ${resp.data[0].preco}`
                }
                else {
                    document.getElementById('productName').innerText = `Desculpe, mas eu acho que você está no lugar errado, eu nunca vi um "${selectedProduct}" na minha vida 😬`

                    document.getElementById('descriptionTextDiv').hidden = true
                    document.getElementById('imgUrlClick').hidden = true
                    document.getElementById('productEspecify').hidden = true
                }
            })
        }
    });

    return(
        <div className="mainContent">
            <Helmet>
                <title>DiNena Store - Estoque</title>
            </Helmet>

            <form id="mainForm" style={{color:"white"}}>
                <h1 id="productName"></h1>

                <div id="descriptionTextDiv">
                    <h3 style={{color:"white", display:"flex", justifyContent:"center"}} id="descriptionText"></h3>
                </div>

                <div id="productImageDisplay" style={{display:"flex", justifyContent:"center"}}>
                    <a id="imgUrlClick"><img id="imgSource"></img></a>
                </div>

                <div className="productEspecify" id="productEspecify">
                    <div className="estoqueStatus" style={{display:"flex", flexDirection:"column"}}>
                        <h2 id="estoqueLabel" style={{display:"flex", alignItems:"center"}}>Em estoque: <h2 style={{color:"red", marginLeft:'10px'}} id="estoqueStatusNo" hidden>Não</h2><h2 style={{color:"green", marginLeft:'10px'}} id="estoqueStatusYes" hidden>Sim</h2></h2>
                    </div>

                    <div className="produtoQuantidade">
                        <h2 id="estoqueQuantidade"></h2>
                    </div>

                    <div className="produtoPreco">
                        <h2 id="preco"></h2>
                    </div>

                    <div className="purchaseButton" style={{display:"flex", justifyContent:"center"}}>
                        <button id="buyButtonEs">Comprar</button>
                    </div>
                </div>
            </form>
        </div>
    )
}