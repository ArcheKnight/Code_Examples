Attribute VB_Name = "Functions"
' ############################
' ##### Helper Functions #####
' ############################

Public Function Invert_Selection(sRange As Range) As Range
    Application.ScreenUpdating = False
    
    Dim cell As Range, rngSelect As Range
    
    With ActiveSheet
        .UsedRange
        If sRange.Address = .UsedRange.Address Then
            Set Invert_Selection = Nothing
            Exit Function
        Else
            For Each cell In .UsedRange
                If Intersect(cell, sRange) Is Nothing Then
                    If rngSelect Is Nothing Then
                        Set rngSelect = cell
                    Else
                        Set rngSelect = Union(rngSelect, cell)
                    End If
                End If
            Next cell
            If Not rngSelect Is Nothing Then
                Set Invert_Selection = rngSelect
                Exit Function
            End If
        End If
    End With
    
    Application.ScreenUpdating = True
End Function

Public Function Select_Invert() ' This calls Invert_Selection as that function existed in a helper module before
    Dim tRange As Range: Set tRange = Helpers.Invert_Selection(Selection): tRange.Select
End Function

' ##########################
' ##### Main Functions #####
' ##########################

Public Function Clear_Everything()
    Application.ScreenUpdating = False
    Application.DisplayAlerts = False

    Dim tSheetName As String: tSheetName = CStr(Int(1000 * Rnd))
    Const fSheetname As String = "Sheet1"
    Dim tSheet As Worksheet, fSheet As Worksheet

    With ActiveWorkbook
        Set tSheet = .Sheets.Add: tSheet.name = tSheetName
        
        For Each wSheet In .Worksheets
            If Not wSheet.name = tSheetName Then
                wSheet.Delete
            End If
        Next wSheet
    
        Set fSheet = .Sheets.Add: fSheet.name = fSheetname
        tSheet.Delete
        fSheet.Range("A1").Select
    End With
    
    Application.DisplayAlerts = True
    Application.ScreenUpdating = True
End Function

Public Function Move_And_Clear()
    Application.DisplayAlerts = False
    Application.ScreenUpdating = False
    
    Dim sRange As Range: Set sRange = Selection
    Dim iRange As Range: Set iRange = Invert_Selection(sRange)
        
    If Not iRange Is Nothing Then
        iRange.Delete
        sRange.Cut Destination:=Range("A1")
    End If
        
    ActiveSheet.UsedRange.Select
    
    Application.DisplayAlerts = True
    Application.ScreenUpdating = True
End Function

Public Function QB_Access_Response(Optional choice As String = "")
    Application.DisplayAlerts = False
    Application.ScreenUpdating = False
    
    Dim eClear As String: eClear = ""
    Dim clearTitle As String: clearTitle = "Erasing"
    Dim clearStatement As String: clearStatement = "Press OK when done"
    
    Dim sht As Worksheet: Set sht = ActiveWorkbook.Worksheets.Add
    
    If choice = "AC/AM" Then
        'Copy AC/AM response
        sht.Range("A1").Value = "Welcome to the Academy Stores QuickBase Application."
        sht.Range("A3").Value = "Please take a moment to register yourself with QuickBase before continuing by clicking on the link below."
        sht.Range("A5").Value = "Please keep in mind that your login information will be your current Walmart address (userID.sxxxxx.us@wal-mart.com) and the password will be what you choose to enter while registering for QuickBase. (Please note QuickBase does not support Single Sign On)."
        sht.Range("A7").Value = "Regards"
        sht.Range("A8").Value = "Academy Team"
        sht.Range("A1:A8").Copy
    ElseIf choice = "ADM/Fac1" Then
        'Copy ADM/AFac1 response
        sht.Range("A1").Value = "Welcome to the Academy Stores QuickBase Application. Please take a moment to register yourself with QuickBase before continuing by clicking on the link below And Ensure to use the Email entered into the Distro List by your Senior Manager to login to QuickBase."
        sht.Range("A3").Value = "Also note that this is a temporary access being granted in order for you to support your Academy. Once your Academy Coordinator/Academy Manager is available, please submit an issue tracker letting us know to revoke your access."
        sht.Range("A5").Value = "Regards"
        sht.Range("A6").Value = "Academy Team"
        sht.Range("A1:A6").Copy
    End If
    
    eClear = MsgBox(clearStatement, , clearTitle)
    If eClear = vbOK Then
        sht.Delete
    End If
    
    Application.DisplayAlerts = True
    Application.ScreenUpdating = True
End Function

