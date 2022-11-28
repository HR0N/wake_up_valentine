class Index {
    constructor(elem) {
        this.el = $(elem);
        this.all_ct = this.el.find('.curtain-text');
        this.ct1 = this.el.find('.curtain-text_1');
        this.ct2 = this.el.find('.curtain-text_2');
        this.ct3 = this.el.find('.curtain-text_3');
        this.ct4 = this.el.find('.curtain-text_4');
        this.ct_count = 1;

        this.l_curtain = this.el.find('.l-curtain');
        this.r_curtain = this.el.find('.r-curtain');

        this.frame_text = this.el.find('.frame-text');
        this.frame_text_1 = this.el.find('.frame-text_1');
        this.frame_text_2 = this.el.find('.frame-text_2');
        this.frame_text_3 = this.el.find('.frame-text_3');
        this.frame_text_3_author = this.el.find('.author');

        this.audio = new Audio('Enya Boadicea.mp3');
        this.stopwtach = 0;
        this.curtains_open_permission = false;
        this.curtains_opened = false;
        this.interval = ()=>{setInterval(()=>{
            this.stopwtach+=.1;
            if(this.stopwtach > 6.8 && this.curtains_open_permission){
                if(!this.curtains_opened){this.curtain_open(); clearInterval(this.interval)}}
            // console.log(this.stopwtach);
            if(this.stopwtach > 40){
                this.frame_text_2.css({'display':'none'});
                this.frame_text_3.fadeIn(1000);
                setTimeout(()=>{this.frame_text_3_author.fadeIn(2000)}, 4000)
            }
            }, 100)};
        this.anc = true;

        this.events();
    }

    start_stopwatch(){
        if(this.anc){this.interval()}
        this.anc = false;

    }

    get_off_curtain(){
        $(this.l_curtain).css({'left':'-50%'});
        $(this.r_curtain).css({'right':'-50%'});
    }
    curtain_open(){
        setTimeout(()=>{
            this.get_off_curtain();
            setTimeout(()=>{this.frame_text_1.fadeIn(500);}, 1000)
        }, 1000);
        setTimeout(()=>{
            this.frame_text_1.css({'display':'none'});
            this.frame_text_2.fadeIn(1000);
        }, 15000);
        this.curtains_opened = true;
    }

    change_curtain_text(){
        this.audio.play();
        this.ct_count+=1;
        this.all_ct.map((k, v)=>{
            if($(v).hasClass(`curtain-text_${this.ct_count}`)){
                $(v).css({'display':'block'});
            }else{
                $(v).css({'display':'none'});
            }
            if(this.ct_count === 5){
                this.ct4.css({'display':'block'});
                this.ct4.fadeOut(999);
            }
        });
        if(this.ct_count >= 5){
            this.ct_count = 5;
            this.curtains_open_permission = true;
            if(this.stopwtach > 6.8){
                this.curtain_open();
            }
        }
    }

    events(){

        this.all_ct.on('click', this.change_curtain_text.bind(this));
        this.all_ct.on('click', this.start_stopwatch.bind(this));
    }
}