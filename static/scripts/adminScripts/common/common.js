const cover = $(".cover");
const alertCont = $(".alert");
const yes = $('.yes');
const no = $('.no');
let dt;


cover.hide();
alertCont.slideUp();

function initializeDoc(columns, requsetDetails) {

    console.log("initialize the documnets");
    $.extend($.fn.dataTable.defaults, {
        responsive: true
    });

    dt = createDataTable(columns, requsetDetails);


    handleEditEvent(dt, requsetDetails);
    handleDeleteEvent(dt, requsetDetails);
    handleViewEvent(dt, requsetDetails);
}


function handleViewEvent(dt, requsetDetails) {
    console.log("inside view method");
    $('#example').on('click', 'a.view', function () {
        // alert("activityTable");
        var data = dt.row($(this).parents('tr')).data();
        // alert("here");
        sessionStorage.setItem(`${requsetDetails.sessionProperty}`, data._id)
        // alert("The ID is: " + sessionStorage.getItem('categoryId'));

        const val = Object.keys(requsetDetails).find(value => {
            return value === 'viewURL';
        });

        console.log("value is", val);

        if (val) {
            location.assign(`${requsetDetails.viewURL}`);
        }
    });
}


function handleEditEvent(dt, requsetDetails) {
    $('#example').on('click', 'a.edit', function () {
        // alert("activityTable");
        var data = dt.row($(this).parents('tr')).data();
        // alert("here");
        sessionStorage.setItem(`${requsetDetails.sessionProperty}`, data._id)
        // alert("The ID is: " + sessionStorage.getItem('categoryId'));

        location.assign(`${requsetDetails.updateURL}`);
    });
}


function handelCustomEvent($this, sessionProperty) {
    // $('#example').on('click', clickedElement, function () {
        const data = dt.row($this.parents('tr')).data();
        console.log($this);
        sessionStorage.setItem(`${sessionProperty}`, data._id);

        console.log("selerId now is", sessionStorage.getItem(`${sessionProperty}`));
    // });
}




function handleDeleteEvent(dt, requsetDetails) {

    $('#example').on('click', 'a.delete', function () {

        var data = dt.row($(this).parents('tr')).data();
        sessionStorage.setItem(`${requsetDetails.sessionProperty}`, data._id);

        console.log("value of the Id", sessionStorage.getItem(`${requsetDetails.sessionProperty}`));

        // cover.css('display', 'block');
        cover.toggle();
        alertCont.slideToggle(500);

    });

    yes.on('click', async () => {
        console.log(sessionStorage.getItem(`${requsetDetails.sessionProperty}`));
        const res = await fetch(`${requsetDetails.mainURL}/${sessionStorage.getItem(`${requsetDetails.sessionProperty}`)}`, {
            method: "DELETE",

            headers: {
                'Content-Type': 'application/json'
            }

        });

        const jsonData = await res.json();

        console.log(jsonData);
        location.assign(`${requsetDetails.mainPage}`);
    });
}

no.on('click', () => {
   
    alertCont.slideToggle(500);
    cover.toggle();

});


function createDataTable(columns, requsetDetails) {
    // let count = 0;
    // const number = {
    //     data: null,
    //     title: "No",
    //     className: "dt-center ",
    //     defaultContent: ++count,
    // }



    const options = [
        {
            data: null,
            className: "dt-center  editor-view",
            defaultContent: '<a class="edit"><i class="fa fa-pencil"/></a>',
            orderable: false
        },
        {
            data: null,
            className: "dt-center editor-delete",
            defaultContent: '<a class="delete"><i class="fa fa-trash"/></a>',
            orderable: false
        }
    ]

    // columns.unshift(number);
    columns = columns.concat(options);

    const dt = $('#example').DataTable({
        responsive: true,
        // responsive: {
        //     details: {
        //         display: $.fn.dataTable.Responsive.display.modal({
        //             header: function (row) {
        //                 var data = row.data();
        //                 console.log(data);
        //                 return 'Details for ' + data.name;
        //             }
        //         }),
        //         renderer: $.fn.dataTable.Responsive.renderer.tableAll()
        //     }
        // },
        order: [
            [2, 'desc'],
            [0, 'asc']
        ],
        selectable: true,
        serverside: true,
        "loading": true,
        "processing": true,
        "initComplete": function (settings, json) {
            $('#example').show();
        },
        "select": true,
        "bFilter": true,
        "bInfo": false,
        "bPaginate": true,
        "columns": columns,
        "language": {
            "emptyTable": "No data to show!"
        },

        "ajax": {
            "type": "get",
            "url": requsetDetails.ajaxURL,
            "content-type": "application/json, utf-8",
            "dataType": "json",
            "dataSrc": ""
        },
        // search: {
        //     return: true,
        // },
        // searching: true

    });

    return dt;

}

