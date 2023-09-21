/*Research Details Table*/

const researchTable = document.querySelector(".main");

const research = [
  {
    title: "Risk Management in Tendering: A Case Study of Oy Arbonaut Ltd",
    authors:
      "Le, Nguyen Thao Vy",
    conferences:
      "Bachelor's Thesis",
    researchYr: 2021,
    citebox: "popup1",
    image: "assets/images/research-page/risk-management.JPG",
    citation: {
      vancouver:
        "Vy Le. Risk Management in Tendering: A Case Study of Oy Arbonaut Ltd. Bachelor's Thesis; 2021.",
    },
    abstract:
      "	Risk management is essential in tendering and project management. With a reliable risk management method, companies can become more resilient to any level of complexity or unpredictability. A robust process could ensure any potential risks is mitigated. The thesis investigates how experts handle risks in tendering and develops feasible risk management strategies at Arbonaut Ltd. This study attempts to clarify the advantages of risk management and define analysis techniques in the bidding process. The primary data of the research was collected from interviews with personnel from Arbonaut. At the same time, the secondary data was retrieved from the tendering reports and its proposal feedbacks. The results determined that risks should be continually assessed throughout different phases. The decision quality of risk analysts can also influence the effectiveness of tender risk governance. Quantitative analysis models are trustworthy instruments in various industries. In comparison, some qualitative tools are criticised for methodological errors and unviable change. Businesses should tailor their risk analysis practices based on the business model, market traits, and core missions.",
    absbox: "absPopup1",
  },

];
AOS.init();
const fillData = () => {
  let output = "";
  research.forEach(
    ({
      image,
      title,
      authors,
      conferences,
      researchYr,
      citebox,
      citation,
      absbox,
      abstract,
    }) =>
      (output += `
            <tr data-aos="zoom-in-left"> 
                <td class="imgCol"><img src="${image}" class="rImg"></td>
                <td class = "researchTitleName">
                    <div class="img-div">
                        <span class="imgResponsive">
                            <img src="${image}" class="imgRes">
                        </span>
                    </div>
                    <a href="#0" class="paperTitle"> ${title} </a> 
                    <div class = "authors"> ${authors} </div> 
                    
                    <div class="rConferences"> ${conferences} 
                        <div class="researchY">${researchYr}</div>
                    </div>
                    
                    <!--CITE BUTTON-->
                    <div class="d-flex" style="margin-right:5%;">
                        <button class="button button-accent button-small text-right button-abstract " type="button" data-toggle="collapse" data-target="#${absbox}" aria-expanded="false" aria-controls="${absbox}">
                            ABSTRACT
                        </button>
                
                        <button class="button button-accent button-small text-right button-abstract " type="button" data-toggle="collapse" data-target="#${citebox}" aria-expanded="false" aria-controls="${citebox}">
                            CITE
                        </button>
                    </div>
                    <div id="${absbox}" class="collapse" aria-labelledby="headingTwo" data-parent=".collapse">
                        <div class="card-body">
                            ${abstract}    
                        </div>
                    </div>
                    <div id="${citebox}" class="collapse" aria-labelledby="headingTwo" data-parent=".collapse">
                        <div class="card-body">
                            ${citation.vancouver}    
                        </div>
                    </div>
                </td>
            </tr>`)
  );
  researchTable.innerHTML = output;
};
document.addEventListener("DOMContentLoaded", fillData);
