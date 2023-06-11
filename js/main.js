

console.log();
const exportBtn = document.getElementById('export');
const themeBtn = document.getElementById('themeBtn')
const themeGallery = document.getElementById('theme-gallery')
function doCapture() {
    html2canvas(document.getElementById("snip")).then(function (canvas) {
        const base64Image = canvas.toDataURL('image/jpeg');
        var anchor = document.createElement('a')
        anchor.setAttribute('href', base64Image);
        if(document.querySelector('.surah-name').textContent != '' && document.querySelectorAll('.verse-frame').length != 0) {
            anchor.setAttribute('download', `${document.querySelector('.surah-name').textContent}_ayat_${document.querySelectorAll('.verse-frame')[0].textContent}_to_${document.querySelectorAll('.verse-frame').length}`)
        }else {
            alert('Choose Ayat Firstly!')
        }
        anchor.click()
        anchor.remove();
    });
}
exportBtn.addEventListener('click', () => {
    document.querySelector(".snip").style.borderRadius = '0px'
    doCapture();
    document.querySelector(".snip").style.borderRadius = '8px'
})
themeBtn.addEventListener('click', () => {
    themeGallery.classList.toggle('active')
})

const themes = document.querySelectorAll('.theme-gallery .theme img');

themes.forEach(theme => {
    theme.addEventListener('click', () => {
        themeGallery.classList.remove('active')
        if(document.querySelectorAll('.verse-frame').length != 0) {
            if(theme.getAttribute('data-color') == '000') {
                document.querySelector('.surah-name').style.color = '#dfdfdf';
                document.querySelector('.snip').style.color = '#dfdfdf'
                document.querySelector('.basmala  img').src = '../images/basmala-white.png';
            }else {
                document.querySelector('.surah-name').style.color = '#000';
                document.querySelector('.snip').style.color = '#000'
                document.querySelector('.basmala  img').src = '../images/basmala.png';
            }
            snip.style.background = `#${theme.getAttribute('data-color')}`
            document.querySelector('#surah-frame').src = theme.getAttribute('data-frame')
            document.querySelectorAll('.verse-frame').forEach(verse => {
                verse.style.backgroundImage = `url(${theme.getAttribute('data-verse')})`
            })
        }else {
            alert('Choose Ayat First')
        }
    })
});
const surahOpt = document.querySelector('.surah-options'),
selectBtn = surahOpt.querySelector('.select-btn'),
content = surahOpt.querySelector('.content'),
searchInp = surahOpt.querySelector('input'),
surahNamesDiv = surahOpt.querySelector('.options ul')
let surahNames;
let versesLi;
const surahName = document.querySelector('.snip .surah-name')

selectBtn.addEventListener('click', () => {
    content.classList.toggle('active')
})

fetch('data/quran_chapters.json')
    .then(async res => res.json())
    .then(data => {
        data.forEach(post => {
            surahNamesDiv.insertAdjacentHTML('beforeend', `<li id="${post.id}surah" id2="${post.id}" data-chapter="${post.id}surah">${post.name}<li>`)
            surahNames = document.querySelectorAll('.options ul li')
        })
        if(data) {
            searchInp.addEventListener('keyup', () => {
                let arrFr = []
                let arr = []
                let searchVal = searchInp.value.toLowerCase();
                surahNames.forEach(surah => {
                    arrFr.push(surah.textContent)
                    if(arrFr.length == 228) {
                        arr = arrFr.filter(data => {
                            return data.toLowerCase().startsWith(searchVal)
                        }).map(data =>`<li>${data}</li>`).join()

                        surahNamesDiv.innerHTML = arr ? arr : `<p>Opp! No Surah With That Name</p>`;
                    }
                });
            })
            surahNames.forEach(surah => {
                if(surah.textContent == '') {
                    surah.remove()
                }
                surah.addEventListener('click', () => {
                    if(surah['id'].slice(0, surah['id'].indexOf('s')) < 10) {
                        surah.id = `00${surah.id}`
                    }else if(surah['id'].slice(0, surah['id'].indexOf('s')) > 10 && surah['id'].slice(0, surah['id'].indexOf('s')) < 100) {
                        surah.id = `0${surah.id}`
                    }else {
                        surah.id = `${surah.id}`
                    }
                    surahName.textContent = surah.id;
                    // const basmala = document.createElement('img')
                    // basmala.src = "../images/basmala.png"
                    // snip.append(basmala);
                    
                    const from = document.createElement('div')
                    from.classList.add('from')
                    const fromOptions = document.createElement('div')
                    fromOptions.classList.add('options')
                    const fromUL = document.createElement('ul')
                    const fromLabel = document.createElement('div')
                    const fromInp = document.createElement('input')
                    const row = document.createElement('div')
                    row.classList.add('row')
                    row.classList.add('row-from')
                    fromInp.setAttribute('placeholder', 'Enter Verse Number')
                    const fromIcon = document.createElement('i')
                    fromIcon.classList.add('fa-solid')
                    fromIcon.classList.add('fa-check')
                    fromInp.setAttribute('type', 'number')
                    fromLabel.classList.add('title')
                    fromLabel.innerHTML = 'Ayat From:'
                    fromOptions.append(fromUL)
                    row.append(fromInp)
                    row.append(fromIcon)
                    from.append(row)
                    from.append(fromOptions)
                    document.querySelector('.surah-options .chooser .wrapper').append(fromLabel)
                    document.querySelector('.surah-options .chooser .wrapper').append(row)
                    document.querySelector('.surah-options .chooser .wrapper').append(from)
                    fetch('data/quran_ar.json')
                        .then(res => res.json())
                        .then(data => {
                            data[surah.getAttribute('id2')].forEach(post => {
                            fromUL.insertAdjacentHTML('beforeend', `<li>${post.text} (${post.verse})<li>`)
                                versesLi = document.querySelectorAll('.from ul li');
                                versesLi.forEach(li => {
                                    if(li.textContent == '') {
                                        li.remove()
                                    }
                                });
                            })
                        })
                        fromInp.addEventListener('keyup', () => {
                            let arrFr = []
                            let arr = []
                            let searchVal = fromInp.value.toLowerCase();
                            versesLi.forEach(verse => {
                                arrFr.push(verse.textContent)
                                arr = arrFr.filter(data => {
                                    return data.toLowerCase().includes(searchVal);
                                }).map(data => `<li>${data}</li>`).join(' ')
                                fromUL.innerHTML = arr ? arr : `<p>Opp! No Verse With That Name</p>`;
                            });
                        })
                        fromIcon.addEventListener('click', () => {
                            if(fromInp.value != '') {
                                document.querySelector('.row-from input').removeAttribute('type')
                                document.querySelector('.row-from input').setAttribute('type', 'text');
                                document.querySelector('.row-from input ').setAttribute('readonly', true);
                                document.querySelector('.from').remove();


                                const to = document.createElement('div')
                                to.classList.add('to')
                                const toOptions = document.createElement('div')
                                toOptions.classList.add('options')
                                const toUL = document.createElement('ul')
                                const toLabel = document.createElement('div')
                                const toInp = document.createElement('input')
                                const row = document.createElement('div')
                                row.classList.add('row')
                                row.classList.add('row-to')
                                toInp.setAttribute('placeholder', 'Enter Verse Number')
                                const toIcon = document.createElement('i')
                                toIcon.classList.add('fa-solid')
                                toIcon.classList.add('fa-check')
                                toInp.setAttribute('type', 'number')
                                toLabel.classList.add('title')
                                toLabel.innerHTML = 'Ayat to:'
                                toOptions.append(toUL)
                                row.append(toInp)
                                row.append(toIcon)
                                to.append(row)
                                to.append(toOptions)
                                document.querySelector('.surah-options .chooser .wrapper').append(toLabel)
                                document.querySelector('.surah-options .chooser .wrapper').append(row)
                                document.querySelector('.surah-options .chooser .wrapper').append(to)

                                fetch('data/quran_ar.json')
                                    .then(res => res.json())
                                    .then(data => {
                                        data[surah.getAttribute('id2')].forEach(post => {
                                            if(post.verse >= fromInp.value ? post.verse : '') {
                                                toUL.insertAdjacentHTML('beforeend', `<li>${post.text} (${post.verse})<li>`)
                                            }else {
                                                return '' 
                                            }
                                            versesLi = document.querySelectorAll('.to ul li');
                                            versesLi.forEach(li => {
                                                if(li.textContent == '') {
                                                    li.remove()
                                                }
                                            });
                                        })
                                    })
                                    toInp.addEventListener('keyup', () => {
                                        let arrFr = []
                                        let arr = []
                                        let searchVal = toInp.value.toLowerCase();
                                        versesLi.forEach(verse => {
                                            arrFr.push(verse.textContent)
                                            arr = arrFr.filter(data => {
                                                return data.toLowerCase().includes(searchVal);
                                            }).map(data => `<li>${data}</li>`).join(' ')
                                            toUL.innerHTML = arr ? arr : `<p>Opp! No Verse With That Name</p>`;
                                        });
                                    })
                                    toIcon.addEventListener('click', () => {
                                        document.querySelector('.row-to input').removeAttribute('type')
                                        document.querySelector('.row-to input').setAttribute('type', 'text');
                                        document.querySelector('.row-to input ').setAttribute('readonly', true);
                                        document.querySelector('.to').remove();
                                        
                                        fetch('data/quran_ar.json')
                                        .then(res => res.json())
                                        .then(data => {
                                            const versesRow = document.createElement('div')
                                            versesRow.id = 'row-verses'
                                            versesRow.classList.add('row')
                                            const versesTxt = document.createElement('div')
                                            versesTxt.classList.add('verse');
                                            data[surah.getAttribute('id2')].forEach(post => {
                                                if(post.verse >= fromInp.value  && post.verse <= toInp.value) {
                                                    let verseArr = ['1','2','3', '4','5','6','7','8','9'];
                                                    let verseArrAr = ['&#x0661;', '&#x0662;' , '&#x0663;' , '&#x0664;', '&#x0665;' , '&#x0666;', '&#x0667;', '&#x0668;', '&#x0669;'];
                                                    // for (let i = 0; i < verseArr.length; i++) {
                                                        //     if(post.verse.toString().includes(verseArr[i])) {
                                                            //         verseArr = ['&#x0661;', '&#x0662;' , '&#x0663;' , '&#x0664;', '&#x0665;' , '&#x0666;', '&#x0667;', '&#x0668;', '&#x0669;']
                                                            //         post.verse[i] = verseArr; 
                                                            //     }
                                                            // }
                                                            // versesTxt.innerHTML = `${post.text} <span class="verse-frame">${post.verse == verseArr ? verseArrAr : ''}</span>`
                                                    versesTxt.innerHTML += `<p>${post.text}</p> <span class="verse-frame"></span>`
                                                    versesRow.append(versesTxt)
                                                    snip.append(versesRow)
                                                    // document.querySelectorAll('.verse-frame').forEach(verse => {
                                                    //     let sArr = [];
                                                    //     let mArr = [];
                                                    //     let lArr = [];
                                                    //     for (let i = 1; i <= 9; i++) {
                                                    //         sArr.push(i)
                                                    //     }
                                                    //     for (let i = 10; i <= 99; i++) {
                                                    //         mArr.push(i)
                                                    //     }
                                                    //     for (let i = 100; i <= 286; i++) {
                                                    //         lArr.push(i)
                                                    //     }
                                                    
                                                    //     // for (let i = 0; i < sArr.length; i++) {
                                                    //     //     if(verse.textContent == sArr[i]) {
                                                    //     //         verse.style.backgroundPositionX = '-1px';
                                                    //     //     }
                                                    //     // }
                                                    //     // for (let i = 0; i < mArr.length; i++) {
                                                    //     //     if(verse.textContent == mArr[i]) {
                                                    //     //         // verse.style.fontSize = '18px !important'
                                                    //     //         verse.style.padding = '0.3rem 0.6rem';
                                                    //     //     }
                                                    //     // }
                                                    //     // for (let i = 0; i < lArr.length; i++) {
                                                    //     //     if(verse.textContent == lArr[i]) {
                                                    //     //         verse.style.padding = '1rem 0.5rem'
                                                    //     //         verse.style.fontSize = '16px';
                                                    //     //     }
                                                    //     // }
                                                    
                                                    // });
                                                }
                                            })
                                        })
                                    })
                            }else {
                                alert('You Have To Enter A Number')
                            }
                        })
                    })
                surah.onclick = () => {
                    content.remove()
                }
            })
        }
    })
const snip = document.getElementById('snip')
const surahFrame = document.querySelector('#surah-frame')
const width = document.getElementById('width')
const fontSize = document.getElementById('fontSize')
const height = document.getElementById('height')
const removeGallery = document.getElementById('close-gallery');
const removePicker = document.getElementById('close-picker');
const colorOptions = document.getElementById('color-options');
const colorPickerDiv = document.querySelector('.color-picker-div')
colorPickerDiv.style.background = window.getComputedStyle(snip).backgroundColor;
const hexColor = document.querySelector('.hex-color')
const hexColorDiv = document.querySelector('.hex-color-div')
const check = document.querySelector('.check')
const selectColor = document.getElementById('select-color')

selectColor.addEventListener('change', () => {
    if(document.querySelector('.verse')) {
        document.querySelector('.verse').style.color = selectColor.value;
        document.querySelectorAll('.verse-frame').forEach(verse => {
            verse.style.color = selectColor.value;
        })
        surahName.style.color = selectColor.value;
        if(selectColor.value = 'white') {
            document.querySelector('.basmala img').src = '../images/basmala-white.png'
        }else {
            document.querySelector('.basmala img').src = '../images/basmala.png'
        }
    }
})
check.addEventListener('click', () => {
    hexColorDiv.style.background = hexColor.value;
    snip.style.background = hexColor.value;
    colorPickerDiv.style.background = hexColor.value;
})
removePicker.addEventListener('click', () => {
    colorOptions.classList.add('close')
})
removeGallery.addEventListener('click', () => {
    imgsGallery.classList.add('close')
})




colorPickerDiv.addEventListener('click', () => {
    colorOptions.classList.remove('close')
})
fontSize.addEventListener('change', () => {
    document.querySelectorAll('.snip .verse').forEach(verse => {
        verse.style.fontSize = `${fontSize.value}px`;
    })
})
fontSize.addEventListener('keyup', () => {
    document.querySelectorAll('.snip .verse').forEach(verse => {
        verse.style.fontSize = `${fontSize.value}px`;
    })
})
width.addEventListener('change', () => {
    snip.style.width = `${width.value}px`;
})
width.addEventListener('keyup', () => {
    snip.style.width = `${width.value}px`;
})
height.addEventListener('change', () => {
    snip.style.height = `${height.value}px`;
})
height.addEventListener('keyup', () => {
    snip.style.height = `${height.value}px`;
})

const suggestedColors = document.querySelectorAll('.suggested-color')

suggestedColors.forEach(color => {
    color.addEventListener('click', () => {
        snip.style.background = color.style.backgroundColor
    })
});

class ColorPicker {
    constructor(root) {
        this.root = root;
        this.colorjoe = colorjoe.rgb(this.root.querySelector(".colorjoe"));
        this.selectedColor = null;
        this.savedColors = this.getSavedColors();
        this.colorjoe.show();
        // this.setSelectedColor("#faf1e3");

        this.colorjoe.on("change", color => {
            this.setSelectedColor(color.hex(), true);
        });

        this.root.querySelectorAll(".saved-color").forEach((el, i) => {
            this.showSavedColor(el, this.savedColors[i]);

            el.addEventListener("mouseup", e => {
                if (e.button == 1) {
                    this.saveColor(this.selectedColor, i);
                    this.showSavedColor(el, this.selectedColor);
                }

                this.setSelectedColor(el.dataset.color);
            });
        });
    }


    setSelectedColor(color, skipCjUpdate = false) {
        this.selectedColor = color;
        this.root.querySelector(".selected-color-text").value = color;
        this.root.querySelector(".selected-color").style.background = color;
        snip.style.background = color;
        colorPickerDiv.style.background = color;

        if (!skipCjUpdate) {
            this.colorjoe.set(color);
        }
    }
    getSavedColors() {
        const saved = JSON.parse(localStorage.getItem("colorpicker-saved") || "[]");

        return new Array(5).fill("#ffffff").map((defaultColor, i) => {
            return saved[i] || defaultColor;
        });
    }

    showSavedColor(element, color) {
        element.style.background = color;
        element.dataset.color = color;
    }

    saveColor(color, i) {
        this.savedColors[i] = color;
        localStorage.setItem("colorpicker-saved", JSON.stringify(this.savedColors));
    }
}
document.querySelector('.copy').addEventListener('click', () => {
    document.querySelector(".selected-color-text").select();
    document.execCommand('copy')
})
const cp = new ColorPicker(document.querySelector(".color-container"));

const imgsGallery = document.querySelector('.imgs-gallery')
const galleryLinks = document.querySelectorAll('#gallery-links li')
const imagesBox = document.querySelectorAll('.images-box')
const imgsBg = document.querySelectorAll('.images-box[data-img="bg"] img')
const imgsFrame = document.querySelectorAll('.images-box[data-img="frame"] img')
const imgsVerseFrame = document.querySelectorAll('.images-box[data-img="verse-frame"] img')
const imgChooser = document.querySelector('.img-chooser')
const imgOptions = document.querySelectorAll('.options li[data-img]')

// const imgsBgCustom = document.querySelectorAll('.images-box[data-img="bg"] img')
// const imgsFrameCustom = document.querySelectorAll('.images-box[data-img="frame"] img')
// const imgsVerseFrameCustom = document.querySelectorAll('.images-box[data-img="verse-frame"] img')
// const imgOptionsCustom = document.querySelectorAll('.options li[data-img-custom]')
// const imagesBoxCustom = document.querySelectorAll('.wrapper[data-type="custom"] .images-box')

imgChooser.addEventListener('click', () => {
    imgsGallery.classList.remove('close')
})
imgOptions.forEach(opt => {
    opt.addEventListener('click', () => {
        if(opt.getAttribute('data-img') == 'bg') {
            imagesBox.forEach(box => {
                box.getAttribute('data-img') == 'bg' ? box.classList.remove('none') : box.classList.add('none')
            });
        }else if(opt.getAttribute('data-img') == 'frame'){
            imagesBox.forEach(box => {
                box.getAttribute('data-img') == 'frame' ? box.classList.remove('none') : box.classList.add('none')
            });
        }else {
            imagesBox.forEach(box => {
                box.getAttribute('data-img') == 'verse-frame' ? box.classList.remove('none') : box.classList.add('none')
            });
        }
    })
});
galleryLinks.forEach(link => {
    link.addEventListener('click', () => {
        for (let i = 0; i < galleryLinks.length; i++) {
            galleryLinks[i].classList.remove('active')
        }
        link.classList.add('active')
        console.log(link);
        if(link.getAttribute('data-type') == 'normal') {
            document.querySelector('.wrapper[data-type="custom"]').classList.remove('active')
            document.querySelector('.wrapper[data-type="normal"]').classList.add('active')
        }else {
            document.querySelector('.wrapper[data-type="normal"]').classList.remove('active')
            document.querySelector('.wrapper[data-type="custom"]').classList.add('active')
        }
    })
});
imgsBg.forEach(img => {
    img.addEventListener('click', () => {
        imgsGallery.classList.add('close')
        imgChooser.style.background = `url("${img.src}")`
        snip.style.background = `url("${img.src}")`
    })
});
imgsFrame.forEach(img => {
    img.addEventListener('click', () => {
        imgsGallery.classList.add('close')
        surahFrame.src = `${img.src}`
    })
});
imgsVerseFrame.forEach(img => {
    img.addEventListener('click', () => {
        imgsGallery.classList.add('close')
        document.querySelectorAll('.verse-frame').forEach(frame => {
            frame.style.backgroundImage = `url(${img.src})`
        })
    })
});

// imgOptionsCustom.forEach(opt => {
//     opt.addEventListener('click', () => {
//         if(opt.getAttribute('data-img-custom') == 'bg') {
//             imagesBox.forEach(box => {
//                 box.getAttribute('data-img-custom') == 'bg' ? box.classList.remove('none') : box.classList.add('none')
//             });
//         }else if(opt.getAttribute('data-img-custom') == 'frame'){
//             imagesBox.forEach(box => {
//                 box.getAttribute('data-img-custom') == 'frame' ? box.classList.remove('none') : box.classList.add('none')
//             });
//         }else {
//             imagesBox.forEach(box => {
//                 box.getAttribute('data-img-custom') == 'verse-frame' ? box.classList.remove('none') : box.classList.add('none')
//             });
//         }
//     })
// });
// imgsBgCustom.forEach(img => {
//     img.addEventListener('click', () => {
//         imgsGallery.classList.add('close')
//         imgChooser.style.background = `url("${img.src}")`
//         snip.style.background = `url("${img.src}")`
//     })
// });
// imgsFrameCustom.forEach(img => {
//     img.addEventListener('click', () => {
//         imgsGallery.classList.add('close')
//         surahFrame.src = `${img.src}`
//     })
// });
// imgsVerseFrameCustom.forEach(img => {
//     img.addEventListener('click', () => {
//         imgsGallery.classList.add('close')
//         document.querySelectorAll('.verse-frame').forEach(frame => {
//             frame.style.backgroundImage = `url(${img.src})`
//         })
//     })
// });











if(document.querySelectorAll('.verse-frame').length != 0) {
}
document.querySelectorAll('.verse-frame').forEach(verse => {
    let sArr = [];
    let mArr = [];
    let lArr = [];
    for (let i = 1; i <= 9; i++) {
        sArr.push(i)
    }
    for (let i = 10; i <= 99; i++) {
        mArr.push(i)
    }
    for (let i = 100; i <= 286; i++) {
        lArr.push(i)
    }

    for (let i = 0; i < sArr.length; i++) {
        if(verse.textContent == sArr[i]) {
            verse.style.backgroundPositionX = '-1px';
        }
    }
    for (let i = 0; i < mArr.length; i++) {
        if(verse.textContent == mArr[i]) {
            // verse.style.fontSize = '18px !important'
            verse.style.padding = '0.3rem 0.6rem';
        }
    }
    for (let i = 0; i < lArr.length; i++) {
        if(verse.textContent == lArr[i]) {
            verse.style.padding = '1rem 0.5rem'
            verse.style.fontSize = '16px';
        }
    }

});

const stylerToggle = document.getElementById('styler-toggle');
// console.log(stylerToggle);
const styler = document.querySelector('.styler');
stylerToggle.onclick = () => {
    document.getElementById('column-width').classList.toggle('active')
    document.querySelectorAll('#color-none').forEach(none => {
        none.classList.toggle('active')
    })
}