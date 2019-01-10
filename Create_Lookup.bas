Attribute VB_Name = "Create_Lookup"
' ##############################################
' ############ CUSTOM TYPES/CLASSES ############
' ##############################################

Private Type winArrayType
    eEle() As String
    eSize As Integer
End Type

' ##########################################
' ############ HELPER FUNCTIONS ############
' ##########################################

Private Function Number_Test(cell As Range, y As Integer) As Boolean
    If Not testNext Then
        Select Case Asc(Mid(cell.Value, y, 1))
            Case 48 To 57
                Number_Test = True
            Case Else
                Number_Test = False
        End Select
    End If
End Function

Private Function Find_Sequence(sRange As Range, winArray As winArrayType) As winArrayType
    Dim cell As Range
    
    For Each cell In sRange.Cells
        Dim x As Integer: x = 0
        Dim y As Integer: y = 0
        Dim i As String: i = ""
        
        If IsEmpty(cell) = False Then
            'MsgBox cell.Address
            If cell.HasFormula Then
                cell.Value = Replace(Mid(CStr(cell.Value), 1, 1), "=", "")
            End If
            For y = 1 To Len(cell)
                If Number_Test(cell, y) Then
                    x = x + 1
                Else
                    x = 0
                End If
            
                If x = 9 Then
                    If y + 1 > Len(cell) Then
                        i = Mid(cell.Value, y - 8, 9)
                        winArray = PushBack_Array(winArray, i)
                        x = 0
                    Else
                        If Not Number_Test(cell, y + 1) Then
                            i = Mid(cell.Value, y - 8, 9)
                            winArray = PushBack_Array(winArray, i)
                            x = 0
                        Else
                            x = 0
                        End If
                    End If
                End If
            Next y
            x = 0
        End If
    Next cell
    
    Find_Sequence = winArray
End Function

Private Function Init_Array() As winArrayType
    Dim winArray As winArrayType
    
    With winArray
        .eSize = 0
        ReDim .eEle(.eSize)
    End With
    
    Init_Array = winArray
End Function

Private Function PushBack_Array(winArray As winArrayType, nString As String) As winArrayType
    With winArray
        If UBound(.eEle) < (.eSize + 1) Then
            ReDim Preserve .eEle(.eSize * 2 + 1)
        End If
        .eSize = .eSize + 1
        .eEle(.eSize) = nString
    End With
    
    PushBack_Array = winArray
End Function

Private Function Create_String(winArray As winArrayType) As String
    Dim wString As String: wString = ""
    
    With winArray
        If Not .eSize = 0 Then
            For x = 1 To .eSize
                If wString = "" Then
                    wString = .eEle(x)
                Else
                    wString = wString & " OR " & .eEle(x)
                End If
            Next x
        End If
    End With
    
    Create_String = wString
End Function

Private Function Print_String(winString As String, nRange As Range)
    nRange.Value = winString
    nRange.Select
    nRange.Copy
End Function

' #####################################
' ############ SUBROUTINES ############
' #####################################

Public Sub Do_Replace()
    Application.DisplayAlerts = False
    Application.ScreenUpdating = False
    
    Dim winArray As winArrayType
    Dim tSht As Worksheet: Set tSht = Worksheets.Add
    tSht.Activate
    tSht.Range("A1").PasteSpecial
    Dim wRange As Range: Set wRange = ActiveSheet.UsedRange
    Dim nRange As Range: Set nRange = wRange.Range("A1").Offset(wRange.Rows.Count + 1, 0)
    Dim winString As String: winString = ""
    
    winArray = Init_Array()
    winArray = Find_Sequence(wRange, winArray)
    winString = Create_String(winArray)
    Call Print_String(winString, nRange)
    
    If wRange.Rows.Count > 24 Then
        ActiveWindow.ScrollRow = wRange.Rows.Count - 17
    End If
    ActiveWindow.ScrollColumn = nRange.Columns.Count
    
    MsgBox "Press OK When Finished"
    tSht.Delete
    
    Application.ScreenUpdating = True
    Application.DisplayAlerts = True
End Sub

