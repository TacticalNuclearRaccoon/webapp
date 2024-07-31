<template>
    <div :class="$style.webappVersionMobileSwipe">
          <div :class="$style.webappVersionMobileSwipeChild" />
          <div :class="$style.webappVersionMobileSwipeItem" />
          <div :class="$style.logoargiosWrapper">
                <img :class="$style.logoargiosIcon" alt="" src="/Users/deni-kun/Documents/v2/plastik/src/assets/logo_argios.png" />
          </div>
          <div :class="$style.raisonDtreParent">
                <div :class="$style.raisonDtre">
                      <ol :class="$style.raisonDtre1">
                            <li>Raison d’être</li>
                      </ol>
                </div>
                <img :class="$style.frameChild" alt="" src="/Users/deni-kun/Documents/v2/plastik/src/assets/vector16.png" />
          </div>
          <div :class="$style.restantParent">
                <b :class="$style.restant">88 % restant</b>
                <div :class="$style.frameItem" />
                <div :class="$style.frameInner" />
          </div>
          <div :class="$style.lesMembresDeVotreQuipeCoParent">
                <b :class="$style.lesMembresDe">Les membres de votre équipe connaissent-ils parfaitement la raison d'être du produit ?*</b>
                      <img :class="$style.frameIcon" alt="" src="/Users/deni-kun/Documents/v2/plastik/src/assets/Frame47.png" />
                      <img :class="$style.frameChild1" alt="" src="/Users/deni-kun/Documents/v2/plastik/src/assets/Frame44.png" />
                      <img :class="$style.frameChild2" alt="" src="/Users/deni-kun/Documents/v2/plastik/src/assets/Frame45.png" />
                      <img :class="$style.frameChild3" alt="" src="/Users/deni-kun/Documents/v2/plastik/src/assets/Frame46.png" />
                      </div>
                      <div :class="$style.lesMembresDeVotreQuipeCoParent">
                            <b :class="$style.lesMembresDe">Les membres de votre équipe connaissent-ils parfaitement la raison d'être du produit ?*</b>
                                  <img :class="$style.frameIcon" alt="" src="/Users/deni-kun/Documents/v2/plastik/src/assets/Frame47.png" />
                                  <img :class="$style.frameChild1" alt="" src="/Users/deni-kun/Documents/v2/plastik/src/assets/Frame44.png" />
                                  <img :class="$style.frameChild2" alt="" src="/Users/deni-kun/Documents/v2/plastik/src/assets/Frame45.png" />
                                  <img :class="$style.frameChild3" alt="" src="/Users/deni-kun/Documents/v2/plastik/src/assets/Frame46.png" />
                                  </div>
                                  <div :class="$style.frameParent">
                                        <div :class="$style.daccordParent">
                                              <b :class="$style.daccord">D’accord</b>
                                              <img :class="$style.closeIcon" alt="" src="/Users/deni-kun/Documents/v2/plastik/src/assets/close.png" />
                                              <div :class="$style.lineDiv" />
                                              <div :class="$style.rectangleDiv" />
                                        </div>
                                        <div :class="$style.daccordParent">
                                              <b :class="$style.daccord">Plutôt d’accord</b>
                                              <img :class="$style.closeIcon" alt="" src="/Users/deni-kun/Documents/v2/plastik/src/assets/close.png" />
                                              <div :class="$style.lineDiv" />
                                        </div>
                                        <div :class="$style.daccordParent">
                                              <b :class="$style.daccord">moyennement d’accord</b>
                                              <img :class="$style.closeIcon" alt="" src="/Users/deni-kun/Documents/v2/plastik/src/assets/close.png" />
                                              <div :class="$style.lineDiv" />
                                        </div>
                                        <div :class="$style.daccordParent">
                                              <b :class="$style.daccord">Pas d’accord</b>
                                              <img :class="$style.closeIcon" alt="" src="/Users/deni-kun/Documents/v2/plastik/src/assets/close.png" />
                                              <div :class="$style.lineDiv" />
                                              <div :class="$style.rectangleDiv" />
                                        </div>
                                  </div>
                                  <div :class="$style.menuWebapp">
                                        <div :class="$style.retourLaccueilParent">
                                              <b :class="$style.retourLaccueil">Retour à l’accueil</b>
                                              <b :class="$style.voirLesEDiagnostics">Voir les e-diagnostics</b>
                                        </div>
                                        <img :class="$style.menuWebappChild" alt="" src="/Users/deni-kun/Documents/v2/plastik/src/assets/frame64.png" />
                                  </div>
                                  </div>
                                  </template>
                                  <script lang="ts">
                                        import { defineComponent } from 'vue'
                                        
                                        
                                        export default defineComponent({
                                              name: "WebappVersionMobileSwipe"})</script>
                                              
                                              
                                              <style module>
                                              .webappVersionMobileSwipeChild {
                                              position: absolute;
                                              top: 610px;
                                              left: 215px;
                                              filter: blur(324px);
                                              border-radius: 50%;
                                              background: linear-gradient(90deg, rgba(142, 45, 226, 0.6), rgba(74, 0, 224, 0.6));
                                              width: 287px;
                                              height: 288px;
                                        }
                                              .webappVersionMobileSwipeItem {
                                                    position: absolute;
                                                    top: -39px;
                                                    left: -114px;
                                                    filter: blur(324px);
                                                    border-radius: 50%;
                                                    background: linear-gradient(90deg, rgba(255, 95, 109, 0.75), rgba(255, 195, 113, 0.75));
                                                    width: 287px;
                                                    height: 288px;
                                              }
                                              .logoargiosIcon {
                                                    width: 56px;
                                                    position: relative;
                                                    height: 33px;
                                                    overflow: hidden;
                                                    flex-shrink: 0;
                                                    object-fit: contain;
                                              }
                                              .logoargiosWrapper {
                                                    position: absolute;
                                                    top: 0px;
                                                    left: 0px;
                                                    background-color: var(--color-white);
                                                    width: 390px;
                                                    display: flex;
                                                    flex-direction: row;
                                                    align-items: center;
                                                    justify-content: space-between;
                                                    padding: 24px;
                                                    box-sizing: border-box;
                                              }
                                              .raisonDtre1 {
                                                    margin: 0;
                                                    font-family: inherit;
                                                    font-size: inherit;
                                                    padding-left: 21px;
                                              }
                                              .raisonDtre {
                                                    position: relative;
                                                    font-weight: 900;
                                              }
                                              .frameChild {
                                                    width: 16px;
                                                    position: relative;
                                                    height: 7px;
                                              }
                                              .raisonDtreParent {
                                                    position: absolute;
                                                    top: 100px;
                                                    left: 24px;
                                                    border-radius: var(--br-9xs);
                                                    background: linear-gradient(90deg, #8e2de2, #4a00e0);
                                                    width: 342px;
                                                    display: flex;
                                                    flex-direction: row;
                                                    align-items: center;
                                                    justify-content: center;
                                                    padding: 16px 10px;
                                                    box-sizing: border-box;
                                                    gap: 10px;
                                                    color: var(--color-white);
                                                    font-family: var(--font-azo-sans);
                                              }
                                              .restant {
                                                    position: absolute;
                                                    top: 15px;
                                                    left: calc(50% - 49px);
                                              }
                                              .frameItem {
                                                    position: absolute;
                                                    top: 42px;
                                                    left: 96px;
                                                    border-radius: var(--br-41xl);
                                                    background-color: rgba(255, 97, 110, 0.1);
                                                    width: 198px;
                                                    height: 16px;
                                              }
                                              .frameInner {
                                                    position: absolute;
                                                    top: 46px;
                                                    left: 99px;
                                                    border-radius: var(--br-41xl);
                                                    background: linear-gradient(90deg, #ff5f6d, #ffc371);
                                                    width: 66px;
                                                    height: 8px;
                                              }
                                              .restantParent {
                                                    position: absolute;
                                                    top: 771px;
                                                    left: 0px;
                                                    background-color: var(--color-white);
                                                    width: 390px;
                                                    height: 73px;
                                                    overflow: hidden;
                                                    color: #283376;
                                              }
                                              .lesMembresDe {
                                                    position: absolute;
                                                    top: calc(50% - 28.5px);
                                                    left: calc(50% - 131px);
                                                    display: inline-block;
                                                    width: 262px;
                                              }
                                              .frameIcon {
                                                    position: absolute;
                                                    top: calc(50% - 16.5px);
                                                    right: -16px;
                                                    border-radius: var(--br-lgi);
                                                    width: 32px;
                                                    height: 32px;
                                                    overflow: hidden;
                                              }
                                              .frameChild1 {
                                                    position: absolute;
                                                    top: -16px;
                                                    left: calc(50% - 16px);
                                                    border-radius: var(--br-lgi);
                                                    width: 32px;
                                                    height: 32px;
                                                    overflow: hidden;
                                              }
                                              .frameChild2 {
                                                    position: absolute;
                                                    top: calc(50% - 16.5px);
                                                    left: -16px;
                                                    border-radius: var(--br-lgi);
                                                    width: 32px;
                                                    height: 32px;
                                                    overflow: hidden;
                                              }
                                              .frameChild3 {
                                                    position: absolute;
                                                    bottom: -16px;
                                                    left: calc(50% - 16px);
                                                    border-radius: var(--br-lgi);
                                                    width: 32px;
                                                    height: 32px;
                                                    overflow: hidden;
                                              }
                                              .lesMembresDeVotreQuipeCoParent {
                                                    position: absolute;
                                                    top: 171px;
                                                    left: 24px;
                                                    box-shadow: 0px 14px 44px rgba(37, 0, 112, 0.2);
                                                    border-radius: var(--br-5xs);
                                                    background-color: var(--color-white);
                                                    width: 342px;
                                                    height: 331px;
                                              }
                                              .daccord {
                                                    position: absolute;
                                                    top: 16px;
                                                    left: 67px;
                                                    display: flex;
                                                    align-items: center;
                                                    justify-content: center;
                                                    width: 275px;
                                              }
                                              .closeIcon {
                                                    position: absolute;
                                                    top: calc(50% - 12.5px);
                                                    left: 22px;
                                                    width: 26px;
                                                    height: 26px;
                                              }
                                              .lineDiv {
                                                    position: absolute;
                                                    top: calc(50% - 20px);
                                                    left: 65.5px;
                                                    border-right: 3px solid var(--color-lightsteelblue);
                                                    box-sizing: border-box;
                                                    width: 3px;
                                                    height: 41px;
                                              }
                                              .rectangleDiv {
                                                    position: absolute;
                                                    top: 0px;
                                                    left: 0px;
                                                    background-color: var(--color-darkslateblue-200);
                                                    width: 1px;
                                                    height: 51px;
                                              }
                                              .daccordParent {
                                                    align-self: stretch;
                                                    position: relative;
                                                    border-radius: var(--br-base);
                                                    background-color: var(--color-white);
                                                    height: 51px;
                                                    overflow: hidden;
                                                    flex-shrink: 0;
                                              }
                                              .frameParent {
                                                    position: absolute;
                                                    top: 527px;
                                                    left: 24px;
                                                    box-shadow: 0px 0px 44px rgba(37, 0, 112, 0.2);
                                                    width: 342px;
                                                    display: flex;
                                                    flex-direction: column;
                                                    align-items: flex-start;
                                                    justify-content: flex-start;
                                                    gap: 8px;
                                                    color: var(--color-darkslateblue-100);
                                              }
                                              .retourLaccueil {
                                                    position: absolute;
                                                    top: 207px;
                                                    left: 40px;
                                              }
                                              .voirLesEDiagnostics {
                                                    position: absolute;
                                                    top: 250px;
                                                    left: 40px;
                                              }
                                              .retourLaccueilParent {
                                                    position: absolute;
                                                    top: 0px;
                                                    left: 438px;
                                                    background-color: var(--color-white);
                                                    width: 311px;
                                                    height: 844px;
                                                    overflow: hidden;
                                              }
                                              .menuWebappChild {
                                                    position: absolute;
                                                    top: 24px;
                                                    left: 326px;
                                                    border-radius: var(--br-9xs);
                                                    width: 40px;
                                                    height: 38px;
                                                    object-fit: cover;
                                              }
                                              .menuWebapp {
                                                    position: absolute;
                                                    top: 0px;
                                                    left: 0px;
                                                    backdrop-filter: blur(44px);
                                                    background-color: rgba(37, 0, 112, 0);
                                                    width: 390px;
                                                    height: 84px;
                                                    overflow: hidden;
                                                    text-align: left;
                                                    font-size: var(--font-size-xl);
                                              }
                                              .webappVersionMobileSwipe {
                                                    width: 100%;
                                                    position: relative;
                                                    background-color: var(--color-white);
                                                    height: 844px;
                                                    overflow: hidden;
                                                    text-align: center;
                                                    font-size: var(--font-size-base);
                                                    color: var(--color-indigo-100);
                                                    font-family: var(--font-inter);
                                              }
                                        
                                        </style>