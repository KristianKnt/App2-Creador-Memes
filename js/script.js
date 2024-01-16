const ANCHO_DISPOSITIVO = window.innerWidth

class CreadorMemes {
    constructor() {
        this.imagenCanvas = document.getElementById('imagenCanvas');
        this.imagen = document.getElementById('imagen');
        this.texoSuperior = document.getElementById('textoSuperiror')
        this.textoInferior = document.getElementById('testoInferior');
        this.descargarMeme = document.getElementById('descargarMeme');

        this.crearCanvas();
        this.agregarEventListeners();


    }

    crearCanvas() {
        let alto = Math.min(480, ANCHO_DISPOSITIVO - 30)
        let ancho = Math.min(640, ANCHO_DISPOSITIVO - 30)

        this.imagenCanvas.height = alto;
        this.imagenCanvas.width = ancho;
    }


    agregarEventListeners() {
        this.crearMeme = this.crearMeme.bind(this);
        this.descargarMeme = this.descargarMeme.bind(this);
        let entradas = [this.texoSuperior, this.textoInferior, this.imagen];

        entradas.forEach(e => e.addEventListener('keyup', this.crearMeme));
        entradas.forEach(e => e.addEventListener('change', this.crearMeme));
        this.descargarMeme.addEventListener('click', this.descargarMeme);

    }

    crearMeme() {
        let contexto = this.imagenCanvas.getContext('2d');

        if (this.imagen.files && this.imagen.files[0]) {
            let lector = new FileReader();

            lector.onload = function () {
                let image = new Image();

                image.onload = funtion(){
                    this.imagenCanvas.height = image.height;
                    this.imagenCanvas.width = image.width;

                    contexto.clearRect(0, 0, this.imagenCanvas.height, this.imagenCanvas.width);
                    contexto.drawImage(image, 0, 0);


                    let tamagnioFuente = ((this.imagenCanvas.width + this.imageCanvas.width) / 2) * 4 / 100;
                    contexto.font = '${tamagnioFuente}pt sans-serif';
                    contexto.textAlign = 'center';
                    contexto.textBaseline = 'top';



                    contexto.lineJoin = 'round';
                    contexto.lineWidth = tamagnioFuente / 5;
                    contexto.strokeStyle = 'black';
                    contexto.fillStyle = 'white';


                    let textoArriba = this.texoSuperior.value.toUpperCase();
                    let textoAbajo = this.textoInferior.value.toUpperCase();


                    contexto.strokeText(textoArriba, this.imageCanvas.width / 2, this.imageCanvas.height * (5 / 100));
                    contexto.fillText(textoArriba, this.imageCanvas.width / 2, this.imageCanvas.height * (5 / 100));


                    contexto.strokeText(textoArriba, this.imageCanvas.width / 2, this.imageCanvas.height * (90 / 100));
                    contexto.fillText(textoArriba, this.imageCanvas.width / 2, this.imageCanvas.height * (90 / 100));


                    this.redimensionarCanvas(this.imagenCanvas.height, this.imagenCanvas.width);

                };



                image.src = lector.result;

            };

            lector.readAsDataURL(this.imagen.files[0]);


        }
    }

    redimensionarCanvas(alto, ancho) {
        this.imagenCanvas.height = '${alto}px';
        this.imagenCanvas.width = '${alto}px';

        while(alto > Math.min(1000, ANCHO_DISPOSITIVO-30) && ancho > Math.min(1000, ANCHO_DISPOSITIVO-30)){
            alto /= 2;
            ancho /= 2;
            this.imagenCanvas.height = '${alto}px';
            this.imagenCanvas.width = '${alto}px';

        }

    }

    descargarMeme() {
        if(this.imagen.file[0]){
            this.imagen.parentElement.classList.add('has-error');
            return;
        }
        
        if(this.textoInferior.value === ''){
            this.imagen.parentElement.classList.add('has-error');
            this.textoInferior.parentElement.classList.add('has-error');
            return;
        }

        this.imagen.parentElement.classList.remove('has-error');
        this.textoInferior.parentElement.classList.remove('has-error');

        let fuenteImagen = this.imagenCanvas.toDataURL('image/png');
        let atributo = document.createAttribute('href');
        fuenteImagen.replace(/^data:image\/[^;/],0)
    }

}