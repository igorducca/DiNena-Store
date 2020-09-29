import React, { Component, useState } from 'react';
import { Helmet } from 'react-helmet';
import Axios from 'axios';
import { Link, useLocation, BrowserRouter as Router } from "react-router-dom";

import "./styles/home.css"
import "./styles/dark-global.css"

import $, { data } from 'jquery'

import moletom from '../assets/moletomdinena.jpg'

import Estoque from './Estoque'

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function changePlaceHolder() {
    var i;

    for (i = 0; i < 50; i++) {
        const phrases = ["Pesquisa aí vai", "Procure algo no estoque", "Pesquise sobre algum produto", "Sobre o que você quer saber?", "O melhor time do mundo também merece a melhor loja", "Nena melhor do mundo", "Procure pelo nome de algum produto"]

        const colors = ["white", "blue", "green", "orange", "pink", "black", "red", "purple", "yellow"]

        var n=0;
        var loopLength=phrases.length;

        setInterval(function(){
            if(n<loopLength){
               var newPlaceholder = phrases[n];
               n++;
               $('#searchHeaderInput').attr('placeholder', phrases[n])
            }
         },5000);
    }
}

changePlaceHolder()

function productSelect() {
    alert('a')
}

function inputRise() {
    document.getElementById("searchHeaderInput").style.width = "900px"

    document.getElementById("searchIcon").style.fontSize = "30px"

    document.getElementById('verEstoqueButton').hidden = false
}

function reactSearchSubmit() { 
    return false;
}

function mouseBuyEnter() {
    document.getElementById('buyButton').innerText = "Clica vai!"
}

function mouseBuyLeave() {
    document.getElementById('buyButton').innerText = "Que pena 😕"
}

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            errorOccurred: false
        };
    
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidCatch(error, info) {
        this.setState({ errorOccurred: true })
        alert("Um erro aconteceu! Recarregue a página!")
    }

    handleChange(event) {
        this.setState({value: event.target.value});

        document.getElementById("pesquisaPreview").innerHTML = `Pesquisar sobre: ${event.target.value}`

        document.getElementById('verEstoqueButton').hidden = true

        if(event.target.value == '') {
            document.getElementById("pesquisaPreview").innerHTML = ''

            document.getElementById('verEstoqueButton').hidden = false
        }
    }

    render() {
    
        function searchData() {
            const product = document.getElementById('searchHeaderInput').value
            
            Axios.get(`http://localhost:3192/produto?product=${product}`)
            .then(resp => {
                document.getElementById('searchTip').hidden = false
                document.getElementById('searchTip').style.backgroundColor = "black"
                document.getElementById('searchTip').style.marginTop = "30px"
                document.getElementById('searchTip').style.color = "white"
                document.getElementById('searchTip').style.borderRadius = "32px"
                document.getElementById('searchTip').style.display = "flex"
                document.getElementById('searchTip').style.flexFlow = "column"
                document.getElementById('searchTip').style.padding = "50px"
                document.getElementById('searchTip').style.listStyle = "none"

                console.log(`Recebi: ${resp}`)

                if(resp.data[0]) {
                    if(resp.data[0].nome) {
                        document.getElementById("estoqueProd").hidden = false
                        document.getElementById("estoqueProd").innerText = "Produto encontrado!"
        
                        document.getElementById('productImg').src = resp.data[0].url
                        document.getElementById('productImg').hidden = false
        
                        document.getElementById('productName').innerText = `Nome do produto: ${resp.data[0].nome}`
                        document.getElementById('productName').hidden = false
        
                        document.getElementById('productCost').innerText = `Preço: R$${resp.data[0].preco},00`
                        document.getElementById('productCost').hidden = false
        
                        document.getElementById('descriptionDiv').hidden = false
                        document.getElementById('descriptionText').innerText = `${resp.data[0].descricao}`
    
                        document.getElementById('quantidadeEstoque').innerText = `Quantidade no estoque: ${resp.data[0].quantidade}`
    
                        document.getElementById('buyButton').hidden = false
                    }
                }
                else {
                    document.getElementById("estoqueProd").hidden = false
                    document.getElementById("estoqueProd").innerText = `Não consegui encontrar um "${product}" no nosso estoque!`
                }
    
                console.log(resp)
            })
        }
    
        return (
            <div className="homeContent" style={{padding:"50px"}}>
                <div className="defaultHome" id="defaultHome" style={{position:"relative"}}>
                    <div className="helmetConfig">
                        <Helmet>
                            <title>DiNena Store - Início</title>
                        </Helmet>
                    </div>
    
                    <div className="searchForm" style={{display: "flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
                        <div className="searchDiv">
                            <FontAwesomeIcon icon={faSearch} style={{fontSize:"1px", color:"white", marginRight:"10px", transition:".7s", cursor:"pointer"}} id="searchIcon" onClick={searchData}/>
                            <input style={{width:"500px"}} id="searchHeaderInput" onClick={inputRise} placeholder="Sobre oque você quer saber?" onChange={this.handleChange} type="text"></input>
                        </div>

                        <div className="verEstoqueDiv" id="verEstoqueDiv" style={{display:"flex", justifyContent:"center", marginTop:"30px"}} hidden>
                            <Link to="/estoque"><button id="verEstoqueButton" className="globalButton" hidden>Ver estoque</button></Link>
                        </div>
    
                        <div className="searchTip" id="searchTip" style={{transition:'.7s'}}>
                            <h2 style={{color:"white", marginBottom:"15px"}} id="estoqueProd" hidden>Produtos em estoque</h2>
                            <img id="productImg" style={{height:"200px", width:"200px", borderRadius:"50%"}} hidden></img>
                            <h3 id="productName" style={{color:"white"}} hidden>Nome do produto: </h3>
                            <h3 id="productCost" style={{color:"red"}} hidden>Preço: </h3>
                            <div id="descriptionDiv" hidden>
                                <h3 style={{color:"white", display:"flex", alignItems:"center"}}>Descrição: <p style={{marginLeft:"5px"}} id="descriptionText"></p></h3>
                                <h3 id="quantidadeEstoque" style={{color:"white"}}></h3>
                            </div>
                            <div className="buyButtonDiv" style={{display:"flex", justifyContent:"center"}}>
                                <Link to={`/estoque?produto=${this.state.value}`}><button id="buyButton" hidden style={{marginTop:"15px"}} onMouseEnter={mouseBuyEnter} onMouseLeave={mouseBuyLeave}>Comprar</button></Link>
                            </div>
                        </div>
                    </div>
    
                    <div className="serachPreview" style={{display:"flex", justifyContent:"center"}}>
                        <h3 style={{color:"white"}} id="pesquisaPreview"></h3>
                    </div>
    
                    <div style={{display:"flex", justifyContent:"center", marginTop:"30px", color:"white"}}>
                            <h3 id="errReason"></h3>
                    </div>
    
                    <div className="formContent">
                        <form id="mainForm">
                            <div className="homeTitle" style={{display:"flex", justifyContent:"center"}}>
                                <h1 style={{fontSize:"57px", color:"white"}} >DiNena Store</h1>
                            </div>
    
                            <div className="storeLegend" style={{display:"flex", justifyContent:"center"}}>
                                <h2 style={{fontSize:"30px", color:"red"}}>A loja oficial do ZDN</h2>
                            </div>
    
                            <div className="productShowcase">
                                <div className="productName" style={{display:"flex", justifyContent:"center", marginTop:"50px"}}>
                                    <h1 style={{color:"white"}}>Nosso último lançamento</h1>
                                </div>
    
                                <div className="productImage" style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                                    <a style={{cursor:"pointer"}}>
                                        <div className="container">
                                            <img src={moletom} style={{height:"300px", borderRadius:"50%", transition:"1s"}} id="productImg"/>
    
                                            <div className="overlay">
                                            <Link to={`/estoque?produto=Moletom`}><FontAwesomeIcon icon={faShoppingCart} className="icon"/></Link>
                                            </div>
                                        </div>
                                    </a>
                                </div>

                                <div className="estoqueButtonDiv" style={{display:"flex", justifyContent:"center", marginTop:"30px"}}>
                                    <Link to="/estoque"><button id="estoqueButton">Ver estoque</button></Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}