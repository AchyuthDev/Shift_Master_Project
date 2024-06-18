
//#region Shift Master Global Variables 
var NumberOfChecked = 0;
var columnName = '';
var ShiftMasterVariables = {
    ShiftMasterGrid: "#ShiftMasterGrid",
    ShiftName: "#shiftname",
    ShiftStartTime: "#shiftStartTime",
    ShiftEndTime:"#shiftEndTime",
    ShiftTotalTime:"#TotalShiftTime",
    LunchStartTime:"#lunchStartTime",
    LunchEndTime:"#LunchEndTime",
    TotalLunchTime: "#TotalLunchTime",
    ShiftNameErrorIcon: "#ShiftNameErrorIcon",
    ShiftNameErrorMsg: "#ShiftNameErrorMsg",
    ShiftStartTimeErrorIcon: "#ShiftStartTimeErrorIcon",
    ShiftStartTimeErrorMsg: "#ShiftStartTimeErrorMsg",
    ShiftEndTimeErrorIcon: "#ShiftEndTimeErrorIcon",
    ShiftEndTimeErrorMsg: "#ShiftEndTimeErrorMsg",
    NightShift: "#chkNightShift",
    Remark: "#kendoTextArea",
    Active: "#chkIsActive",
    btnSave: "#btnSave",
    ApiBaseAdress: "#ApiBaseAdress",
    Grid: "#grid",
    ActionIcon: ".more-vert-icon",

    ToolbarbtnEdit: "#ToolbarbtnEdit",
    ToolbarbtnView: "#btnGrid",
    ToolbarbtnDelete: "#btnDelete",
    AddPopUp: "#AddPopUp",
    ToolbarbtnAdd: "#btnAdd",
    btnCancel: "#btnCancel",
    btnEdit: "#btnEdit",
    btnRefresh: "#btnRefresh",
    DialogBoxView: "#view-icon",
    DialogBoxEdit: "#edit-icon",
    DialogBoxDelete: "#delete-icon"
};


//#endregion Shift Master Global Variables 

$(document).ready(function () {
    var ApiBaseAdress = $(ShiftMasterVariables.ApiBaseAdress).val();
    console.log(typeof kendo); // Should output "object"


    $(ShiftMasterVariables.ToolbarbtnEdit).addClass("disabled-icon");
   $( ShiftMasterVariables.ToolbarbtnView).addClass("disabled-icon");
    $(ShiftMasterVariables.ToolbarbtnDelete).addClass("disabled-icon"); 

   

    $("#column-icon").on('click', function () {
        var grid = $(ShiftMasterVariables.Grid).data("kendoGrid");

        // Get the current position of the icon
        var offset = $(this).offset();
        var left = offset.left + $(this).outerWidth();
        var top = offset.top;

        // Manually open the column menu
        // Assuming the first column's menu will be opened as an example
        var column = grid.columns[0]; // Adjust the index to the specific column
        var menu = grid.wrapper.find(".k-header-menu");

        // Position the menu
        menu.css({
            left: left + "px",
            top: top + "px"
        }).show();
    });
  
    $("#acending-icon").on('click', function () {
       
        // Get reference to the Kendo UI Grid
        var grid = $("#grid").data("kendoGrid");

        // Get the column to sort by (assuming it's "columnName")
        var column = columnName; // Replace "columnName" with the actual column field name

        // Sort the data in ascending order by the specified column
        grid.dataSource.sort({ field: column, dir: "asc" });
        $("#filter-box").hide();
    });
    $("#decending-icon").on('click', function () {

        // Get reference to the Kendo UI Grid
        var grid = $("#grid").data("kendoGrid");

        // Get the column to sort by (assuming it's "columnName")
        var column = columnName; // Replace "columnName" with the actual column field name

        // Sort the data in ascending order by the specified column
        grid.dataSource.sort({ field: column, dir: "desc" });
        $("#filter-box").hide();
    });

    $("#txtSearch").on("input", function () {

        var value = $("#txtSearch").val().toLowerCase();
        $("#grid tr").filter(function () {
            var shiftName = $(this).find("td:eq(2)").text().toLowerCase(); // 2 refers to the index of "Shift Name" column
            $(this).toggle(shiftName.indexOf(value) > -1);
        });
    });
  
   
    var checkedIds = [];
    //#region Checking existing Shift Name
   
    var Exist = true;
    function CheckingExistingName(ShiftName) {
        $.ajax({
            url: ApiBaseAdress + "/api/ShiftMaster/GetShiftNames",
            type: "GET",
            success: function (result) {
                console.log(result);
               
                $.each(result, function (index, name) {
                    console.log(name);
                    console.log(name.shiftName);

                    if (name.shiftName == ShiftName) {
                        IsValid = false;
                        return false;  // Exit the loop
                    }
                });
                
            },
            error: function () {
                console.log("Error occurred while fetching shift names.");
               
            }
        });
    }
   
    //#endregion


    //#region time Difference Caluclation part
    $(ShiftMasterVariables.ShiftEndTime).on('change', function () {

        var endTime = $(ShiftMasterVariables.ShiftEndTime).val();
        var startTime = $(ShiftMasterVariables.ShiftStartTime).val();
        
        if (endTime != '' && startTime != '') {

            var TotalTime = calculateTimeDifference24Hour(startTime, endTime);
            $(ShiftMasterVariables.ShiftTotalTime).val(TotalTime);
            $("#ShiftStartTimeIcon").hide();
            $(ShiftMasterVariables.ShiftStartTimeErrorIcon).hide();
            $(ShiftMasterVariables.ShiftStartTimeErrorMsg).hide();
            $(ShiftMasterVariables.ShiftEndTimeErrorMsg).hide();
            $(ShiftMasterVariables.ShiftEndTimeErrorIcon).hide();
            $("#ShiftEndTimeIcon").hide();

        }
        else {
            $(ShiftMasterVariables.ShiftTotalTime).val('');
        }

    });
    $(ShiftMasterVariables.ShiftStartTime).on('change', function () {
        var endTime = $(ShiftMasterVariables.ShiftEndTime).val();
        var startTime = $(ShiftMasterVariables.ShiftStartTime).val();
       
        if (startTime == '') {
            $(ShiftMasterVariables.ShiftTotalTime).val('');
        }
        else if (startTime != '' && endTime != '') {
            var TotalTime = calculateTimeDifference24Hour(startTime, endTime);
            $(ShiftMasterVariables.ShiftTotalTime).val(TotalTime);
            $("#ShiftStartTimeIcon").hide();
            $(ShiftMasterVariables.ShiftStartTimeErrorIcon).hide();
            $(ShiftMasterVariables.ShiftStartTimeErrorMsg).hide();
            $(ShiftMasterVariables.ShiftEndTimeErrorMsg).hide();
            $(ShiftMasterVariables.ShiftEndTimeErrorIcon).hide();
            $("#ShiftEndTimeIcon").hide();
        }
        else {
            $("#ShiftStartTimeIcon").hide();
            $(ShiftMasterVariables.ShiftStartTimeErrorIcon).hide();
            $(ShiftMasterVariables.ShiftStartTimeErrorMsg).hide();
        }
    });


    $(ShiftMasterVariables.LunchEndTime).on('change', function () {
        var endTime = $(ShiftMasterVariables.LunchEndTime).val();
        var startTime = $(ShiftMasterVariables.LunchStartTime).val();
        var TotalTime = calculateTimeDifference24Hour(startTime, endTime);
        $(ShiftMasterVariables.TotalLunchTime).val(TotalTime);
    });

    function parseTime24Hour(timeStr) {
        const [hours, minutes] = timeStr.split(':');
        return new Date(`1970-01-01T${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00`);
    }

    function calculateTimeDifference24Hour(startTime, endTime) {
        const startDate = parseTime24Hour(startTime);
        const endDate = parseTime24Hour(endTime);

        let diffMs = endDate - startDate;
        if (diffMs < 0) {
            // Adjust for times crossing midnight
            diffMs += 24 * 60 * 60 * 1000;
        }

        const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

        var TotalTime = diffHrs * 60 + diffMins;

        return TotalTime;
    }

    //#endregion time Difference Caluclation part


    //#region applying validations on add shift master

    $(ShiftMasterVariables.ShiftName).on('input', function () {
        var shiftname = $(ShiftMasterVariables.ShiftName).val();
        if (!/^[a-zA-Z]{1}[a-z\sA-Z]*$/.test(shiftname)) {
            $(ShiftMasterVariables.ShiftNameErrorMsg).text('Name should only contain alphabetic characters and starting space not allowed').show();
            $(ShiftMasterVariables.ShiftNameErrorIcon).show();
            $("#ShiftNameIcon").show();
            $(".ValidationErrors").show();

        } else {
            $(ShiftMasterVariables.ShiftNameErrorMsg).hide();
            $(ShiftMasterVariables.ShiftNameErrorIcon).hide();
            $("#ShiftNameIcon").hide();
           
        }
    });
    function CheckValidation() {
        var IsValid = true;
        //Retriving fileds values
        
        var ShiftName = $(ShiftMasterVariables.ShiftName).val();
        var ShiftStartTime = $(ShiftMasterVariables.ShiftStartTime).val();
        var ShiftEndTime = $(ShiftMasterVariables.ShiftEndTime).val();
        if (ShiftName == '') {
            $(ShiftMasterVariables.ShiftNameErrorIcon).show();
            $(ShiftMasterVariables.ShiftNameErrorMsg).text("Please Enter Shift Name").show();
            $("#ShiftNameIcon").show();
            $(".ValidationErrors").show();
            IsValid = false;
        }
        else if (ShiftName != '') {
           
           
            $.ajax({
                url:ApiBaseAdress+ "/api/ShiftMaster/ValidateShiftName?shiftName=" + ShiftName,
                type: "Get",
                success: function (response) {
                   
                    if (response) {
                        IsValid = false;
                        $(ShiftMasterVariables.ShiftNameErrorIcon).show();
                        $(ShiftMasterVariables.ShiftNameErrorMsg).text("Shift Name All Ready Exist").show();
                        $("#ShiftNameIcon").show();
                        $(".ValidationErrors").show();
                    }
                   
                },
                error: function () {

                }

            });
        }
        else {
            $(ShiftMasterVariables.ShiftNameErrorIcon).hide();
            $(ShiftMasterVariables.ShiftNameErrorMsg).hide();
            $("#ShiftNameIcon").hide();
        }
       
       
        
        if (ShiftStartTime == '') {
            $(ShiftMasterVariables.ShiftStartTimeErrorIcon).show();
            $(ShiftMasterVariables.ShiftStartTimeErrorMsg).show();
            $("#ShiftStartTimeIcon").show();
            $(".ValidationErrors").show();
            IsValid = false;

        }
        else {
            $(ShiftMasterVariables.ShiftStartTimeErrorIcon).hide();
            $(ShiftMasterVariables.ShiftStartTimeErrorMsg).hide();
            $("#ShiftStartTimeIcon").hide();
           
        }
        if (ShiftEndTime == '') {
            $(ShiftMasterVariables.ShiftEndTimeErrorIcon).show();
            $(ShiftMasterVariables.ShiftEndTimeErrorMsg).show();
            $("#ShiftEndTimeIcon").show();
            $(".ValidationErrors").show();
            IsValid = false;
        }
        else {
            $(ShiftMasterVariables.ShiftEndTimeErrorIcon).hide();
            $(ShiftMasterVariables.ShiftEndTimeErrorMsg).hide();
            $("#ShiftEndTimeIcon").hide();

        }
        ///checking user checked night and active checkbox or not
        var NightShift = true;
        if ($(ShiftMasterVariables.NightShift).prop("checked")) {
            NightShift = true;
        }
        else {
            NightShift = false;
        }
        var Active=true;
       
      if ($(ShiftMasterVariables.Active).prop("checked"))
          {
           Active = true;
      }
      else
      {
           Active = false;
      }
        ///Creating object for storing shift details
        var ShiftDetails = {
            ShiftName: $(ShiftMasterVariables.ShiftName).val(),
            NightShift: NightShift,
            ShiftStartTime: $(ShiftMasterVariables.ShiftStartTime).val(),
            ShiftEndTime: $(ShiftMasterVariables.ShiftEndTime).val(),
            TotalShiftTime: $(ShiftMasterVariables.ShiftTotalTime).val(),
            LunchStartTime: $(ShiftMasterVariables.LunchStartTime).val(),
            LunchEndTime: $(ShiftMasterVariables.LunchEndTime).val(),
            TotalLunchTime: $(ShiftMasterVariables.TotalLunchTime).val(),
                Remark: $(ShiftMasterVariables.Remark).val(),
            IsActive: Active
        };

        if (IsValid) {
                $.ajax({
                    url: ApiBaseAdress + "/api/ShiftMaster/AddShift",
                    type: "Post",
                    data: ShiftDetails,
                    success: function () {

                        popupWindow.center().close();
                        $("#Errorheading").text("Success!");
                        $("#MessageText").text("Shift Added Successfully ").show();
                        $("#Errorheading").css("color", "green");
                        $(".ErrorMessage").show();

                        $("#overlay").fadeIn(400);

                        // Set a timer to hide the message after 3 seconds with a fade-out effect
                        setTimeout(function () {
                            $("#overlay").fadeOut(400);
                        }, 3000); // 3000 milliseconds = 3 second
                        GetDataFromApi();
                        GetDataFromApi();
                    },
                    error: function () {
                        alert("Technical Issue try again");
                    }

                });

            console.log(IsValid);
        }

    }
    //#endregion applying validations on add shift master
    // #region Initialization Ui Elements
    // Initialize Kendo UI CheckBox
    $(ShiftMasterVariables.NightShift).kendoCheckBox();
    $(ShiftMasterVariables.Active).kendoCheckBox();
    // Initialize Kendo UI Button
   // $(ShiftMasterVariables.btnSave).kendoButton();
    $(ShiftMasterVariables.btnCancel).kendoButton();
    $(ShiftMasterVariables.btnEdit).kendoButton();


    
   
    // #endregion Initialization  

 


    var popupWindow = $(ShiftMasterVariables.AddPopUp).kendoWindow({
        width: "800px",  // Set the desired width
        height: "550px", // Set the desired height
        title: "Shift : Add",
        visible: false,
        actions: [
            "Close"
        ]
    }).data("kendoWindow");

    
    // #endregion Initialize the Kendo UI Window

    

    // Bind the activate event dynamically
    function bindActivateForFocus(elementId) {
        popupWindow.unbind("activate"); // Unbind previous event
        popupWindow.bind("activate", function () {
            $(elementId).focus();
        });
    }

    GetDataFromApi();

    function GetDataFromApi() {
        $.ajax({
            url: ApiBaseAdress+"/api/ShiftMaster/GetAllShifts?$filter=isDelete eq false",
            type: "GET",
            success: function (response) {
                BindData(response);
                // Populate the grid with initial data
                
            },
            error: function () {
                alert("technical error from api");
            }
        });
    }

    //#region Binding the Data Into Shift Master Grid 
    function BindData(response) {
        $(ShiftMasterVariables.Grid).kendoGrid({
            dataSource: {
                data: response,
                schema: {
                    model: {
                        fields: {
                            ShiftId: { type: "number" },
                            ShiftName: { type: "string" },
                            NightShift: { type: "string" },
                            StartTime: { type: "string" },
                            EndTime: { type: "string" },
                            TotalShiftTime: { type: "string" },
                            LunchStartTime: { type: "string" },
                            LunchEndTime: { type: "string" },
                            TotalLunchTime: { type: "string" },
                            Remark: { type: "string" },
                            isActive: { type: "boolean" }
                        }
                    }
                },
                pageSize: 10
            },
            height: 400,
           
            pageable: {
                numeric: true,
                refresh: true,
                pageSizes: [10, 25, 50],
                previousNext: true,
                input: false,
                info: false
            },
            /*filterable: true,*/
            /*sortable: { mode: "multiple" },*/
           
           
            resizable: { rows: true, columns: true },
            columns: [
                {
                    selectable: true,
                    width: 60,
                    attributes: {
                        "class": "checkbox-align"
                    },
                    headerAttributes: {
                        "class": "checkbox-align"
                    }
                     
                },
                { field: "shiftId", title: "Id", width: 1, headerAttributes: { class: "custom-header" }  },
                {
                    field: "shiftName",
                    title: "Shift Name",
                    width: 135,
                    headerAttributes: { class: "custom-header" },
                    attributes: { class: "Shiftname-color" },
                    headerTemplate: createHeaderTemplate("Shift Name","shiftName")
                    
                                    
                },
                { field: "nightShift", title: "Night Shift", width: 130, headerAttributes: { class: "custom-header" }, headerTemplate: createHeaderTemplate("Night Shift", "nightShift") },
                { field: "shiftStartTime", title: "Start Time", width: 130, headerAttributes: { class: "custom-header" }, headerTemplate: createHeaderTemplate("Start Time","shiftStartTime") },
                { field: "shiftEndTime", title: "End Time", width: 120, headerAttributes: { class: "custom-header" }, headerTemplate: createHeaderTemplate("End Time", "shiftEndTime") },
                { field: "totalShiftTime", title: "Total Shift Time", width: 160, headerAttributes: { class: "custom-header" }, headerTemplate: createHeaderTemplate("Total Shift Time", "totalShiftTime") },
                { field: "lunchStartTime", title: "Lunch Start Time", width: 165, headerAttributes: { class: "custom-header" }, headerTemplate: createHeaderTemplate("Lunch Start Time", "lunchStartTime") },
                { field: "lunchEndTime", title: "Lunch End Time", width: 120, headerAttributes: { class: "custom-header" }, headerTemplate: createHeaderTemplate("End Time", "lunchEndTime") },
                { field: "totalLunchTime", title: "Total Lunch Time", width: 160, headerAttributes: { class: "custom-header" }, headerTemplate: createHeaderTemplate("Total Lunch Time", "totalLunchTime") },
                { field: "remark", title: "Remark", width: 120, headerAttributes: { class: "custom-header" }, headerTemplate: createHeaderTemplate("Remark", "remark") },
                { field: "isActive", title: "Active", width: 120, headerAttributes: { class: "custom-header" }, headerTemplate: createHeaderTemplate("Active", "isActive") },
                { field: "Action", title: "Actions", width: 120, template: "<div class='action-icons'><i data-id='#:shiftId#' class='material-icons more-vert-icon'>more_vert</i></div>", headerAttributes: { class: "custom-header" } }
            ],
            /*columnMenu: true*/ /*// Enable column menu*/
           
           
            dataBound: function () {
                $(ShiftMasterVariables.ToolbarbtnAdd).on("click", function () {
                   
                    $(ShiftMasterVariables.ShiftName).val('');
                    
                    $(ShiftMasterVariables.ShiftName).prop("disabled", false);
                    $(ShiftMasterVariables.ShiftStartTime).val('');
                    $(ShiftMasterVariables.ShiftStartTime).prop("disabled", false);
                    $(ShiftMasterVariables.ShiftEndTime).val('');
                    $(ShiftMasterVariables.ShiftEndTime).prop("disabled", false);
                    $(ShiftMasterVariables.ShiftTotalTime).val('');
                    $(ShiftMasterVariables.ShiftTotalTime).prop("disabled", false);
                    $(ShiftMasterVariables.LunchStartTime).val('');
                    $(ShiftMasterVariables.LunchStartTime).prop("disabled", false);
                    $(ShiftMasterVariables.LunchEndTime).val('');
                    $(ShiftMasterVariables.LunchEndTime).prop("disabled", false);
                    $(ShiftMasterVariables.TotalLunchTime).val('');
                    $(ShiftMasterVariables.TotalLunchTime).prop("disabled", false);
                    $(ShiftMasterVariables.NightShift).prop("disabled", false);
                    $(ShiftMasterVariables.Remark).val('');
                    
                    $(ShiftMasterVariables.Remark).prop("disabled",false);
                    $(ShiftMasterVariables.Active).prop('checked', true);
                    $(ShiftMasterVariables.Active).prop('disabled', false);
                    $(ShiftMasterVariables.NightShift).prop("checked", false);

                    $(".ValidationErrors").hide();
                    $("#ShiftNameIcon").hide();
                    $("#ShiftStartTimeIcon").hide();
                    $("#ShiftEndTimeIcon").hide();

                    // Bind activate event to focus shiftname textbox
                    bindActivateForFocus(ShiftMasterVariables.ShiftName);

                    $(ShiftMasterVariables.btnSave).text("Save");
                   
                    $(ShiftMasterVariables.btnSave).show();
                    $(ShiftMasterVariables.btnCancel).show();
                    var newTitle = "Shift : Add";
                    popupWindow.title(newTitle);
                   

                   
                    popupWindow.center().open();
                  
                });
               
                // Use event delegation to handle click events on dynamically generated icons
                $(ShiftMasterVariables.Grid).off('click', ShiftMasterVariables.ActionIcon).on('click', ShiftMasterVariables.ActionIcon, function () {
                    var id = $(this).data('id');
                    $('#hiddenfield').attr("value", id);

                    var dialog = $("#dialog-box");
                    var dialogWidth = dialog.outerWidth();
                    var dialogHeight = dialog.outerHeight();

                    var top = event.pageY - dialogHeight / 2;
                    var left = event.pageX - dialogWidth - 10; // Subtracting dialog width and some padding to position left

                    dialog.css({
                        top: top + "px",
                        left: left + "px"
                    }).show();
                  //  dialog.open();

                   
                });


                // Handle checkbox change event
                $(ShiftMasterVariables.Grid).off('change', 'input[type="checkbox"]').on('change', 'input[type="checkbox"]', function () {
                    var checked = $(this).is(':checked');
                    var grid = $(ShiftMasterVariables.Grid).data("kendoGrid");
                    var row = $(this).closest("tr");
                    var dataItem = grid.dataItem(row);

                    var anyChecked = $('#grid .k-grid-content tbody input[type="checkbox"]:checked').length > 0;
                    NumberOfChecked = $('#grid .k-grid-content tbody input[type="checkbox"]:checked').length > 1;

                    if (checked) {
                        // If checked, add the ID to the array if it is not already present
                        if (!checkedIds.includes(dataItem.shiftId)) {
                            checkedIds.push(dataItem.shiftId);
                        }
                    }
                    else {
                        // If unchecked, remove the ID from the array
                        var index = checkedIds.indexOf(dataItem.shiftId);
                        if (index > -1) {
                            checkedIds.splice(index, 1);
                        }
                    }

                    if (anyChecked) {

                        

                        console.log("Checked record ID: ", dataItem.shiftId);
                        $("#hiddenShiftId").attr("value", dataItem.shiftId);
                        $("#ToolbarbtnEdit,#btnGrid,#btnDelete").css("opacity", "1"); // Increase to full opacity
                        // Example: Change pointer-events to 'none'
                        $("#ToolbarbtnEdit,#btnGrid,#btnDelete").css("pointer-events", "auto");
                        // Example: Change cursor to 'pointer'
                        $("#ToolbarbtnEdit,#btnGrid,#btnDelete").css("cursor", "pointer");


                        // Perform your actions here with the checked record ID
                    }
                    else {
                        console.log("Unchecked record ID: ", dataItem.shiftId);
                        // Perform your actions here with the unchecked record ID
                        $("#hiddenShiftId").attr("value", '');
                        $("#ToolbarbtnEdit,#btnGrid,#btnDelete").css("opacity", "0.5"); // Increase to full opacity
                        $("#ToolbarbtnEdit,#btnGrid,#btnDelete").css("pointer-events", "none");
                    }
                });

                // Add click event for the "more_vert" icons in the header except for the "Action" column
                $(ShiftMasterVariables.Grid).off('click', '.more-vert-header').on('click', '.more-vert-header', function (event) {
                    handleIconClick(event);

                });

            }
        });
    }
    // Function to create a header template with "more_vert" icon
    function createHeaderTemplate(title,filedname) {
        return `
        <div class='header-with-icon'>
            ${title}
            <i class='material-icons more-vert-header' data-colunmname='${filedname}'  onclick='handleIconClick(event)' id='Header-morevert-icon' style='cursor:pointer;vertical-align:middle;'>more_vert</i>
        </div>
    `;
    }

    $(window).resize(function () {
        var grid = $(ShiftMasterVariables.Grid).data("kendoGrid");
        if (grid) {
            grid.resize(); // Resize grid on window resize
        }
    });
    // Function to handle the click event
  
    window.handleIconClick = function (event) {
       

        event.stopPropagation(); // Prevent event propagation
        var icon = event.currentTarget; // Get the clicked icon

          columnName = $(icon).data('colunmname');

        var $icon = $(event.target); // Get the clicked icon
        var $filterBox = $('#filter-box'); // Reference to the filter box

        // Get the icon's position relative to the document
        var offset = $icon.offset();
        var iconHeight = $icon.outerHeight();
        var iconWidth = $icon.outerWidth();
        var filterBoxWidth = $filterBox.outerWidth();

        // Calculate the position for the filter-box to align it below the icon
        var top = offset.top + iconHeight;
        var left = offset.left + iconWidth - filterBoxWidth;

        // Set the position of the filter-box and display it
        $filterBox.css({
            top: top + 'px',
            left: left + 'px',
            display: 'block'
        });

        // Remove the event listener after execution if needed
        $(icon).off('click', handleIconClick);
    };
   

    $(document).on('click', function (event) {
        var $filterBox = $('#filter-box');
        if (!$filterBox.is(event.target) && $filterBox.has(event.target).length === 0) {
            $filterBox.hide();
        }
    });
    //#endregion Binding the Data Into Shift Master Grid 



    //#region Button Click Events

    // Hide the dialog box if user clicks outside of it
    $(document).on("click", function (event) {
        if (!$(event.target).closest(".dialog-box, .more-vert-icon").length) {
            $("#dialog-box").hide();
        }
    });

    //refress icon event
    $(ShiftMasterVariables.btnRefresh).on("click", function () {
        $("#ToolbarbtnEdit,#btnGrid,#btnDelete").css("opacity", "0.5"); // Increase to full opacity
        $("#ToolbarbtnEdit,#btnGrid,#btnDelete").css("pointer-events", "none");
        GetDataFromApi();
        GetDataFromApi();
        checkedIds = [];
    });

    // Handle the click event on the Edit
    $(document).on("click", ShiftMasterVariables.DialogBoxEdit, function () {
        var shiftid = $('#hiddenfield').val();
       
      
        $("#dialog-box").hide();
        UpdatePopUp(shiftid);
       
    });

    //Handle the click event on View
    $(document).on("click",ShiftMasterVariables.DialogBoxView, function () {
        var shiftid = $('#hiddenfield').val();
       
        $("#dialog-box").hide();
        ToolbarIconView(shiftid);
       


    });

    //Handle the click event on Delete
    $(document).on("click", ShiftMasterVariables.DialogBoxDelete, function () {
        var shiftid = $('#hiddenfield').val();
        $("#dialog-box").hide();
        $("#customModal").show();
        $("#btnConformDelete").on("click", function () {
            ToolBarIconDelete(shiftid);
        });
        $("#btnConfirmCancel").on("click", function () {
            $("#customModal").hide();
        });
       
    });
     
    $(ShiftMasterVariables.btnCancel).on('click', function () {
        popupWindow.close();
    });

    $(ShiftMasterVariables.btnSave).on('click', function () {
        var value = $(ShiftMasterVariables.btnSave).text();
        if (value == "Update") {
            UpdateShift();
        }
        else {
            CheckValidation();
        }
        
    });
    //#endregion Button Click Events

    //#region Update the shift 
    function UpdateShift() {

        var Active = true;

        if ($(ShiftMasterVariables.Active).prop("checked")) {
            Active = true;
        }
        else {
            Active = false;
        }
        var UpdatedShiftdetail = {
            ShiftId: $('#hiddenfield').val(),
            Remark: $(ShiftMasterVariables.Remark).val(),
            IsActive:Active

        };

        $.ajax({
            url: ApiBaseAdress + "/api/ShiftMaster/UpdateShift?ShiftId="+UpdatedShiftdetail.ShiftId,
            type: "patch",
            data: UpdatedShiftdetail,
            success: function (response) {
                popupWindow.close();
                $(".ErrorMessage").css("background-color", "#d4edda");
                $("#Errorheading").text("Success!");
                $("#Errorheading").css("color", "green");
                $("#MessageText").text("One Shift updated Successfully ").show();
                $(".ErrorMessage").show();

                $("#overlay").fadeIn(400);

                // Set a timer to hide the message after 3 seconds with a fade-out effect
                setTimeout(function () {
                    $("#overlay").fadeOut(400);
                }, 3000); // 3000 milliseconds = 3 second
               GetDataFromApi();
                var grid = $("#grid").data("kendoGrid");
                grid.dataSource.read();
                GetDataFromApi();
                $("#ToolbarbtnEdit,#btnGrid,#btnDelete").css("opacity", "0.5"); // Increase to full opacity
                $("#ToolbarbtnEdit,#btnGrid,#btnDelete").css("pointer-events", "none");

            },
            error: function () {

            }
        });

    }

    
    //#endregion


    //#region Toolbar icons click events

    $(ShiftMasterVariables.ToolbarbtnEdit).on("click", function () {


        if (checkedIds.length == 1) {
            $("#hiddenfield").attr("value", checkedIds[0]);
            UpdatePopUp(checkedIds[0]);
        }
        else {
            $(".ErrorMessage").css("background-color", "#FFF0F5");
            $("#Errorheading").text("Error!");
            $("#MessageText").text("Please Select One Shift Only To Edit ").show();
            $("#Errorheading").css("color", "red");
            $(".ErrorMessage").show();

            $("#overlay").fadeIn(400);

            // Set a timer to hide the message after 3 seconds with a fade-out effect
            setTimeout(function () {
                $("#overlay").fadeOut(400);
            }, 3000); // 3000 milliseconds = 3 second
        }

       
    });
    $(ShiftMasterVariables.ToolbarbtnView).on("click", function () {

        if (checkedIds.length == 1) {
           
            ToolbarIconView(checkedIds[0]);
        }
        else {
            $(".ErrorMessage").css("background-color", "#FFF0F5");
            $("#Errorheading").text("Error!");
            $("#MessageText").text("Please Select One Shift Only To View ").show();
            $("#Errorheading").css("color", "red");
            $(".ErrorMessage").show();

            $("#overlay").fadeIn(400);

            // Set a timer to hide the message after 3 seconds with a fade-out effect
            setTimeout(function () {
                $("#overlay").fadeOut(400);
            }, 3000); // 3000 milliseconds = 3 second
        }
      
    });

    $(ShiftMasterVariables.ToolbarbtnDelete).on("click", function () {
        $("#customModal").show();
        $("#btnConformDelete").on("click", function () {
            for (var id of checkedIds) {
                ToolBarIconDelete(id);
            }
        });
        $("#btnConfirmCancel").on("click", function () {
            $("#customModal").hide();
        });
       
    });
    //#endregion

    //#region Update and View display pop up functions

    function UpdatePopUp(shiftid) {
        $.ajax({
            url: ApiBaseAdress + "/api/ShiftMaster/GetShiftDetails?id=" + shiftid,
            type: "Get",
            success: function (response) {
                console.log(response);
                $(ShiftMasterVariables.ShiftName).val(response.shiftName);
                $(ShiftMasterVariables.ShiftName).prop("disabled", true);
                $(ShiftMasterVariables.ShiftStartTime).val(response.shiftStartTime);
                $(ShiftMasterVariables.ShiftStartTime).prop("disabled", true);
                $(ShiftMasterVariables.ShiftEndTime).val(response.shiftEndTime);
                $(ShiftMasterVariables.ShiftEndTime).prop("disabled", true);
                $(ShiftMasterVariables.ShiftTotalTime).val(response.totalShiftTime);
                $(ShiftMasterVariables.ShiftTotalTime).prop("disabled", true);
                $(ShiftMasterVariables.LunchStartTime).val(response.lunchStartTime);
                $(ShiftMasterVariables.LunchStartTime).prop("disabled", true);
                $(ShiftMasterVariables.LunchEndTime).val(response.lunchEndTime);
                $(ShiftMasterVariables.LunchEndTime).prop("disabled", true);
                $(ShiftMasterVariables.TotalLunchTime).val(response.totalLunchTime);
                $(ShiftMasterVariables.TotalLunchTime).prop("disabled", true);
                $(ShiftMasterVariables.NightShift).prop("disabled", true);

                if (response.nightShift == "true") {

                    $(ShiftMasterVariables.NightShift).prop("checked", true);

                }
                else {

                    $(ShiftMasterVariables.NightShift).prop("checked", false);
                }

                $(ShiftMasterVariables.Remark).val(response.remark);
                $(ShiftMasterVariables.Remark).prop("disabled", false);
                if (response.isActive == true) {
                    $(ShiftMasterVariables.Active).prop("checked", true);
                }
                else {
                    $(ShiftMasterVariables.Active).prop("checked", false);
                }
                $(ShiftMasterVariables.Active).prop("disabled", false);
                var newTitle = "Shift : Edit";
                popupWindow.title(newTitle);
                $(ShiftMasterVariables.btnSave).text("Update");

                // Bind activate event to focus shiftname textbox
                bindActivateForFocus(ShiftMasterVariables.Remark);

                $(ShiftMasterVariables.btnSave).show();
                $(ShiftMasterVariables.btnCancel).show();

                $(".ValidationErrors").hide();
                $("#ShiftNameIcon").hide();
                $("#ShiftStartTimeIcon").hide();
                $("#ShiftEndTimeIcon").hide();
                popupWindow.center().open();
            },
            error: function () {

            }

        });
    }

    function ToolbarIconView(shiftid) {
        $.ajax({
            url: ApiBaseAdress + "/api/ShiftMaster/GetShiftDetails?id=" + shiftid,
            type: "Get",
            success: function (response) {
                console.log(response);
                $(ShiftMasterVariables.ShiftName).val(response.shiftName);
                $(ShiftMasterVariables.ShiftName).prop("disabled", true);
                $(ShiftMasterVariables.ShiftStartTime).val(response.shiftStartTime);
                $(ShiftMasterVariables.ShiftStartTime).prop("disabled", true);
                $(ShiftMasterVariables.ShiftEndTime).val(response.shiftEndTime);
                $(ShiftMasterVariables.ShiftEndTime).prop("disabled", true);
                $(ShiftMasterVariables.ShiftTotalTime).val(response.totalShiftTime);
                $(ShiftMasterVariables.ShiftTotalTime).prop("disabled", true);
                $(ShiftMasterVariables.LunchStartTime).val(response.lunchStartTime);
                $(ShiftMasterVariables.LunchStartTime).prop("disabled", true);
                $(ShiftMasterVariables.LunchEndTime).val(response.lunchEndTime);
                $(ShiftMasterVariables.LunchEndTime).prop("disabled", true);
                $(ShiftMasterVariables.TotalLunchTime).val(response.totalLunchTime);
                $(ShiftMasterVariables.TotalLunchTime).prop("disabled", true);
                $(ShiftMasterVariables.NightShift).prop("disabled", true);

                if (response.nightShift == "true") {

                    $(ShiftMasterVariables.NightShift).prop("checked", true);

                }
                else {

                    $(ShiftMasterVariables.NightShift).prop("checked", false);
                }

                $(ShiftMasterVariables.Remark).val(response.remark);
                $(ShiftMasterVariables.Remark).prop("disabled", true);
                if (response.isActive == true) {
                    $(ShiftMasterVariables.Active).prop("checked", true);
                }
                else {
                    $(ShiftMasterVariables.Active).prop("checked", false);
                }
                $(ShiftMasterVariables.Active).prop("disabled", true);
                var newTitle = "Shift : View";
                popupWindow.title(newTitle);

                $(ShiftMasterVariables.btnCancel).show();
                $(ShiftMasterVariables.btnSave).hide();
               

                $(".ValidationErrors").hide();
                $("#ShiftNameIcon").hide();
                $("#ShiftStartTimeIcon").hide();
                $("#ShiftEndTimeIcon").hide();
                



                popupWindow.center().open();
            },
            error: function () {

            }

        });
    }

    function ToolBarIconDelete(shiftid) {
        $.ajax({
            url: ApiBaseAdress + "/api/ShiftMaster/DeleteShift?id=" + shiftid,
            type: "delete",
            success: function (response) {

                $("#Errorheading").text("Success!");
                $("#MessageText").text("Shift Deleted Successfully ").show();
                $("#Errorheading").css("color", "green");
                $(".ErrorMessage").show();

                $("#overlay").fadeIn(400);

                // Set a timer to hide the message after 3 seconds with a fade-out effect
                setTimeout(function () {
                    $("#overlay").fadeOut(400);
                }, 3000); // 3000 milliseconds = 3 second

                $("#customModal").hide();
                GetDataFromApi();
                GetDataFromApi();
                $("#ToolbarbtnEdit,#btnGrid,#btnDelete").css("opacity", "0.5"); // decrease to full opacity
                $("#ToolbarbtnEdit,#btnGrid,#btnDelete").css("pointer-events", "none");
            },
            error: function () {

            }
        });
    }

    //#endregion


    $("#ExportPdfExcel").click(function () {
        $("#dropdownMenu").toggle();
    });

    $("#exportToExcelSelected").on('click', function () {

        if (checkedIds.length == 0) {
            $(".ErrorMessage").css("background-color", "#FFF0F5");
            $("#Errorheading").text("Error!");
            $("#MessageText").text("Please Select Atlest One Shift  To Excel Export ").show();
            $("#Errorheading").css("color", "red");
            $(".ErrorMessage").show();

            $("#overlay").fadeIn(400);

            // Set a timer to hide the message after 3 seconds with a fade-out effect
            setTimeout(function () {
                $("#overlay").fadeOut(400);
            }, 3000); // 3000 milliseconds = 3 second
        }
        else {
            console.log(checkedIds);
            var grid = $("#grid").data("kendoGrid");
            var dataSource = grid.dataSource;
            var data = dataSource.data();
            console.log(data);
            var RecordData = [];
            for (var j = 0; j < checkedIds.length; j++) {

                for (var i = 0; i < data.length; i++) {
                    if (data[i].shiftId === checkedIds[j]) {
                        RecordData.push(data[i]); // Push the found record into the array
                        break;
                    }
                }
            }
            var jsonData = [];
            console.log(jsonData);
            RecordData.forEach(function (item) {
                jsonData.push({
                    "ShiftName": item.shiftName,
                    "NightShift": item.nightShift,
                    "StartTime": item.shiftStartTime,
                    "EndTime": item.shiftEndTime,
                    "TotalShiftTime": item.totalShiftTime,
                    "LunchStarTime": item.lunchStartTime,
                    "LunchEndTime": item.lunchEndTime,
                    "TotalLunchTime": item.totalLunchTime,
                    "Remark": item.remark,
                    "Active": item.isActive,
                    // add all the necessary columns here
                });
            });

            // Convert JSON to sheet
            var worksheet = XLSX.utils.json_to_sheet(jsonData);

            // Create a new workbook
            var workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "ShiftMaster");

            // Export the workbook
            XLSX.writeFile(workbook, "ShiftMaster.xlsx");
        }

        GetDataFromApi();
        GetDataFromApi();
       
    });
    // Export grid data to Excel
    // Export all data to Excel
        $("#exportToExcel").on("click", function(e) {
            var grid = $("#grid").data("kendoGrid");
            var data = grid.dataSource.data();
            console.log(grid);
            console.log(data);

            var jsonData = [];

            data.forEach(function (item) {
                jsonData.push({
                    "ShiftName": item.shiftName,
                    "NightShift": item.nightShift,
                    "StartTime": item.shiftStartTime,
                    "EndTime": item.shiftEndTime,
                    "TotalShiftTime": item.totalShiftTime,
                    "LunchStarTime": item.lunchStartTime,
                    "LunchEndTime": item.lunchEndTime,
                    "TotalLunchTime": item.totalLunchTime,
                    "Remark": item.remark,
                    "Active": item.isActive,
                    // add all the necessary columns here
                });
            });

            // Convert JSON to sheet
            var worksheet = XLSX.utils.json_to_sheet(jsonData);

            // Create a new workbook
            var workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "ShiftMaster");

            // Export the workbook
            XLSX.writeFile(workbook, "ShiftMaster.xlsx");
        });

   
    $(".btn-close").on("click", function () {
        $("#overlay").hide();
        $(".ErrorMessage").hide();
    });
});