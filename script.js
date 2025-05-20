document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("tarea");
  const formulario = document.getElementById("my-form");
  const h2 = document.querySelector("h2");
  const tareas = document.getElementById("tareas");
  const h1 = document.querySelector("h1");
  const title = document.getElementById("title");
  const divPrincipal = document.getElementById("input-tareas");
  const pomoBoton = document.getElementById("pomodoro");
  const shortbrkBttn = document.getElementById("shortbreak");
  const longBttn = document.getElementById("longbreak");
  const divCrono = document.getElementById("cronoo");
  let cuantoTiempo = 0;
  let formListenerAdded = false;
  divCrono.style.display = "none";
  tareas.style.display = "none";
  divPrincipal.style.display = "none";
  h1.style.display = "none";
  h2.style.display = "none";
  formulario.style.display = "none";
  let tiempo;
  let [minutos, segundos] = [0, 1];
  let estadoPausa = false;
  function cronometro(estado) {
    tiempo = setInterval(() => {
      if (segundos === 0) {
        if (minutos === 0) {
          estadoPausa = true;
        } else {
          minutos--;
          segundos = 59;
        }
      } else {
        segundos--;
      }

      const temp = `${minutos < 10 ? "0" + minutos : minutos}:${
        segundos < 10 ? "0" + segundos : segundos
      }`;

      console.log(temp);
      h2.innerText = temp;
      title.innerText = `${temp} - ${estado}`;
    }, 1000);
  }

  pomoBoton.addEventListener("click", () => {
    Array.from(divPrincipal.children).forEach((hijo) => {
      if (hijo !== formulario) {
        divPrincipal.removeChild(hijo);
      }
    });
    title.innerText = "Pomodoro";
    divPrincipal.style.display = "block";
    divCrono.style.display = "block";
    formulario.style.display = "block";
    h1.style.display = "block";
    h2.style.display = "block";
    h1.innerText = "Pomodoro";

    if (tiempo) {
      clearInterval(tiempo);
    }
    let tiempoUsuario = parseFloat(window.prompt("How many minutes?"));
    if (isNaN(tiempoUsuario) || tiempoUsuario <= 0) {
      alert("Por favor, ingresa un número válido de minutos.");
      return;
    }
    [minutos, segundos] = [tiempoUsuario, 0];
    tiempoArreglado =
      tiempoUsuario < 10 ? `0${tiempoUsuario}:00` : `${tiempoUsuario}:00`;

    h2.innerText = tiempoArreglado;
    if (!formListenerAdded) {
      formulario.addEventListener("submit", (event) => {
        event.preventDefault();
        tareas.style.display = "block";
        formulario.style.display = "none";
        if (input.value.length > 27) {
          alert("Escriba menos de 28 caracteres");
        } else {
          console.log(input.value);
          let p = document.createElement("p");
          p.textContent = input.value;

          let botonStart = document.createElement("button");
          botonStart.innerHTML = '<i class="bi bi-caret-right-square"></i>';
          botonStart.classList.add("startbutton", "botones-button");
          let botonPause = document.createElement("button");
          botonPause.innerText = "Pause";
          botonPause.innerHTML = '<i class="bi bi-pause-btn"></i>';
          botonPause.classList.add("botones-button", "pausebutton");
          let botonDone = document.createElement("button");
          botonDone.innerHTML = '<i class="bi bi-check-square"></i>';
          botonDone.classList.add("botones-button");

          divPrincipal.appendChild(p);
          divPrincipal.appendChild(botonStart);
          input.value = "";

          const checkInterval = setInterval(() => {
            if (estadoPausa) {
              h2.innerText === "00:00";
              clearInterval(tiempo);
              title.innerText = "Completed!";
              clearInterval(checkInterval);
              botonPause.replaceWith(botonDone);
              estadoPausa = false;
              alert("Terminaste tu pomodoro");
            }
          }, 1000);
          botonStart.addEventListener("click", () => {
            if (tiempo) {
              clearInterval(tiempo);
            }
            cronometro("Running");
            botonStart.replaceWith(botonPause);
          });
          botonPause.addEventListener("click", () => {
            clearInterval(tiempo);
            botonPause.replaceWith(botonStart);
            title.innerText = `${[minutos,segundos]} - Pause`
          });
          botonDone.addEventListener("click", () => {
            divPrincipal.removeChild(p);
            divPrincipal.removeChild(botonDone);
            formulario.style.display = "flex";
            formulario.style.justifyContent = "center";
            title.innerText = "Pomodoro"
          });
        }
      });
      formListenerAdded = true;
    }
  });

  shortbrkBttn.addEventListener("click", () => {
    divCrono.style.display = "block";
    tareas.style.display = "none";
    divPrincipal.style.display = "none";
    formulario.style.display = "none";
    h1.style.display = "block";
    h2.style.display = "block";
    h1.innerText = "Taking break...";
    h2.innerText = "15:00";
    if (tiempo) {
      clearInterval(tiempo);
    }
    [minutos, segundos] = [15, 0];
    cronometro("Short break");
  });

  longBttn.addEventListener("click", () => {
    divCrono.style.display = "block";
    tareas.style.display = "none";
    divPrincipal.style.display = "none";
    formulario.style.display = "none";
    h1.style.display = "block";
    h2.style.display = "block";
    h1.innerText = "Enjoy your break...";
    h2.innerText = "30:00";
    if (tiempo) {
      clearInterval(tiempo);
    }
    [minutos, segundos] = [30, 0];
    cronometro("Long break");
  });

  const originalBackgroundColor = document.body.style.backgroundColor; 

});
